import { ConnectTestDto, CreateDatasourceDto } from '@/dtos';
import { User } from '@/entities/User';
import { Workspace } from '@/entities/Workspace';
import { DataSource } from '@/entities/DataSource';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource as DB, Repository } from 'typeorm';

@Injectable()
export class DataSourceService {
  @InjectRepository(User)
  private userRepo: Repository<User>;

  @InjectRepository(Workspace)
  private wsRepo: Repository<Workspace>;

  @InjectRepository(DataSource)
  private dsRepo: Repository<DataSource>;

  async create(userId: number, body: CreateDatasourceDto) {
    const user = await this.userRepo.findOneByOrFail({ id: userId });
    const ws = await this.wsRepo.findOneByOrFail({ id: body.workspace });

    const ds = this.dsRepo.create({
      name: body.name,
      type: body.type,
      ip: body.type,
      port: body.port,
      password: body.password,
      database: body.database,
      creator: user,
      workspace: ws,
      datasets: [],
    });

    await this.dsRepo.save(ds);

    return null;
  }

  findAll() {
    return `This action returns all datasource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datasource`;
  }

  update(id: number) {
    return `This action updates a #${id} datasource`;
  }

  remove(id: number) {
    return `This action removes a #${id} datasource`;
  }

  async test(body: ConnectTestDto) {
    const db = new DB({
      type: body.type,
      host: body.ip,
      port: body.port,
      username: body.user,
      password: body.password,
      database: body.database,
      synchronize: false,
      logging: true,
      connectorPackage: 'mysql2',
    });

    try {
      await db.initialize();
      await db.destroy();
    } catch (e) {
      return { status: false };
    }

    return { status: true };
  }
}
