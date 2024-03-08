import { DataSource } from '@/entities/DataSource';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessException } from '@reus-able/nestjs';
import { mysqlDataTypeToCategory } from '@/utils';
import { DataSource as DB, Repository } from 'typeorm';
import { CreateDataSetDto } from '@/dtos';
import { Field } from '@/entities/Field';
import { DataSet } from '@/entities/DataSet';

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

  findAll() {
    return `This action returns all dataSet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dataSet`;
  }

  update(id: number, updateDataSetDto) {
    return `This action updates a #${id} dataSet`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataSet`;
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
}
