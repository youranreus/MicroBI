import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessException } from '@reus-able/nestjs';
import { mysqlDataTypeToCategory } from '@/utils';
import { DataSource as DB, Like, Repository } from 'typeorm';
import {
  CreateDataSetDto,
  UpdateDataSetDto,
  DatasetFieldCreateDto,
  QueryDataDto,
} from '@/dtos';
import { Field, DataSet, DataSource } from '@/entities';
import { paginate } from 'nestjs-typeorm-paginate';
import { isNil } from 'lodash';
import { getFieldSqlStr, getQuotaSqlArr, transferDto2Sql } from '@/utils';

interface DataSetQueryParam {
  datasource?: string;
  workspace?: string;
}

@Injectable()
export class DataSetService {
  @InjectRepository(DataSet)
  private dsRepo: Repository<DataSet>;

  @InjectRepository(DataSource)
  private srcRepo: Repository<DataSource>;

  @InjectRepository(Field)
  private fieldRepo: Repository<Field>;

  async create(userId: number, body: CreateDataSetDto) {
    const src = await this.srcRepo.findOneOrFail({
      where: { id: body.datasource },
      relations: {
        workspace: {
          users: true,
        },
      },
    });

    if (!src.workspace.users.some((u) => u.id === userId)) {
      BusinessException.throwForbidden();
    }

    const dataset = this.dsRepo.create({
      datasource: src,
      workspace: src.workspace,
      name: body.name,
      tablename: body.tablename,
      fields: [],
    });

    await this.dsRepo.save(dataset);

    const fields = body.fields.map((f) =>
      this.fieldRepo.create({
        name: f.name,
        fieldname: f.fieldname,
        type: f.type,
        workspace: src.workspace,
        dataset,
      }),
    );

    dataset.fields = fields;

    await this.dsRepo.save(dataset);

    return null;
  }

  async findAll(page = 1, limit = 10, param: DataSetQueryParam, search = '') {
    if (isNil(param)) {
      BusinessException.throwForbidden();
    }

    const queryParam: Partial<
      Record<'workspace' | 'datasource', { id: number }>
    > = {};
    if (param.datasource) {
      queryParam.datasource = { id: +param.datasource };
    }
    if (param.workspace) {
      queryParam.workspace = { id: +param.workspace };
    }

    const { items, meta } = await paginate<DataSet>(
      this.dsRepo,
      { page, limit },
      {
        where: {
          name: Like(`%${search}%`),
          ...queryParam,
        },
        relations: {
          workspace: true,
          datasource: true,
        },
      },
    );

    return {
      items: items.map((ds) => ds.getData()),
      total: meta.totalItems,
    };
  }

  async findOne(userId: number, id: number) {
    const ds = await this.dsRepo.findOneOrFail({
      where: { id },
      relations: {
        workspace: {
          users: true,
        },
        datasource: true,
        fields: true,
      },
    });

    if (!ds.workspace.users.some((u) => u.id === userId)) {
      BusinessException.throwForbidden();
    }

    return {
      meta: ds.getData(),
      fields: ds.fields.map((f) => f.getData()),
    };
  }

  async update(userId: number, id: number, body: UpdateDataSetDto) {
    const ds = await this.dsRepo.findOneOrFail({
      where: { id },
      relations: {
        workspace: {
          users: true,
        },
      },
    });

    if (!ds.workspace.users.some((u) => u.id === userId)) {
      BusinessException.throwForbidden();
    }

    ds.name = body.name;

    await this.dsRepo.save(ds);

    return null;
  }

  async remove(userId: number, id: number) {
    const ds = await this.dsRepo.findOneOrFail({
      where: { id },
      relations: {
        workspace: {
          users: true,
        },
      },
    });

    if (!ds.workspace.users.some((u) => u.id === userId)) {
      BusinessException.throwForbidden();
    }

    await this.dsRepo.remove(ds);

    return null;
  }

  async getColumn(srcId: number, userId: number, tableName: string) {
    const src = await this.srcRepo.findOneOrFail({
      where: { id: srcId },
      relations: { workspace: { users: true } },
    });

    if (!src.workspace.users.some((u) => u.id === userId)) {
      BusinessException.throwForbidden();
    }

    const db = new DB({
      type: src.type,
      host: src.ip,
      port: src.port,
      username: src.user,
      password: src.password,
      database: src.database,
      synchronize: false,
      logging: true,
      connectorPackage: 'mysql2',
    });
    await db.initialize();

    const cols = await db.query(`
      SELECT COLUMN_NAME "name", DATA_TYPE "type"
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = '${tableName}'
      AND TABLE_SCHEMA = '${src.database}'
    `);

    await db.destroy();

    return cols.map((col) => ({
      ...col,
      type: mysqlDataTypeToCategory(col.type),
    }));
  }

  async addField(user: number, id: number, body: DatasetFieldCreateDto) {
    const ds = await this.dsRepo.findOneOrFail({
      where: { id },
      relations: {
        workspace: {
          users: true,
        },
      },
    });

    if (!ds.workspace.users.some((u) => u.id === user)) {
      BusinessException.throwForbidden();
    }

    const field = this.fieldRepo.create({
      name: body.name,
      fieldname: body.fieldname,
      type: body.type,
      workspace: ds.workspace,
      dataset: ds,
    });

    await this.fieldRepo.save(field);

    return null;
  }

  async getFields(user: number, id: number) {
    const ds = await this.dsRepo.findOneOrFail({
      where: { id },
      relations: {
        workspace: {
          users: true,
        },
        fields: true,
      },
    });

    if (!ds.workspace.users.some((u) => u.id === user)) {
      BusinessException.throwForbidden();
    }

    return ds.fields.map((f) => f.getData());
  }

  async updateField(
    user: number,
    id: number,
    wsId: number,
    body: Partial<DatasetFieldCreateDto>,
  ) {
    const field = await this.fieldRepo.findOneOrFail({
      where: {
        id,
        dataset: {
          id: wsId,
        },
      },
      relations: {
        workspace: {
          users: true,
        },
        dataset: true,
      },
    });

    if (!field.workspace.users.some((u) => u.id === user)) {
      BusinessException.throwForbidden();
    }

    ['fieldname', 'name', 'type'].forEach((key) => {
      if (body[key]) {
        field[key] = body[key];
      }
    });

    await this.fieldRepo.save(field);

    return null;
  }

  async deleteField(user: number, id: number, wsId: number) {
    const field = await this.fieldRepo.findOneOrFail({
      where: {
        id,
        dataset: {
          id: wsId,
        },
      },
      relations: {
        workspace: {
          users: true,
        },
        dataset: true,
      },
    });

    if (!field.workspace.users.some((u) => u.id === user)) {
      BusinessException.throwForbidden();
    }

    await this.fieldRepo.remove(field);

    return null;
  }

  async previewData(user: number, id: number) {
    const ds = await this.dsRepo.findOneOrFail({
      where: { id },
      relations: {
        datasource: true,
        workspace: {
          users: true,
        },
        fields: true,
      },
    });

    const src = ds.datasource;

    if (!ds.workspace.users.some((u) => u.id === user)) {
      BusinessException.throwForbidden();
    }

    const db = new DB({
      type: src.type,
      host: src.ip,
      port: src.port,
      username: src.user,
      password: src.password,
      database: src.database,
      synchronize: false,
      logging: true,
      connectorPackage: 'mysql2',
    });
    await db.initialize();

    const fieldStr = getFieldSqlStr(ds.fields);

    const data = await db.query(`SELECT ${fieldStr} FROM ${ds.tablename}`);

    await db.destroy();

    return data;
  }

  async queryData(user: number, id: number, body: QueryDataDto) {
    const ds = await this.dsRepo.findOneOrFail({
      where: { id },
      relations: {
        datasource: true,
        workspace: {
          users: true,
        },
      },
    });

    const src = ds.datasource;

    if (!ds.workspace.users.some((u) => u.id === user)) {
      BusinessException.throwForbidden();
    }

    const db = new DB({
      type: src.type,
      host: src.ip,
      port: src.port,
      username: src.user,
      password: src.password,
      database: src.database,
      synchronize: false,
      logging: true,
      connectorPackage: 'mysql2',
    });
    await db.initialize();

    let sql = `SELECT ${[
      ...getQuotaSqlArr(body.quotas),
      ...transferDto2Sql(body.dims),
    ].join(', ')} FROM ${ds.tablename}`;
    if (body.dims.length) {
      sql += ` GROUP BY ${transferDto2Sql(body.dims, false)}`;
    }

    const data = await db.query(sql);

    await db.destroy();

    return {
      data,
      sql,
    };
  }
}
