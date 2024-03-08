import { DataSource } from '@/entities/DataSource';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessException } from '@reus-able/nestjs';
import { mysqlDataTypeToCategory } from '@/utils';
import { DataSource as DB, Repository } from 'typeorm';

@Injectable()
export class DataSetService {
  @InjectRepository(DataSource)
  private srcRepo: Repository<DataSource>;

  create(createDataSetDto) {
    return 'This action adds a new dataSet';
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
