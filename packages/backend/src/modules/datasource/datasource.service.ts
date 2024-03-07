import {
  ConnectTestDto,
  CreateDatasourceDto,
  UpdateDatasourceDto,
} from '@/dtos';
import { User } from '@/entities/User';
import { Workspace } from '@/entities/Workspace';
import { DataSource } from '@/entities/DataSource';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource as DB, Like, Repository } from 'typeorm';
import { BusinessException } from '@reus-able/nestjs';
import { paginate } from 'nestjs-typeorm-paginate';

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
      user: body.user,
      password: body.password,
      database: body.database,
      creator: user,
      workspace: ws,
      datasets: [],
    });

    await this.dsRepo.save(ds);

    return null;
  }

  async findAll(page = 1, limit = 10, wsId: number, search = '') {
    const { items, meta } = await paginate<DataSource>(
      this.dsRepo,
      { page, limit },
      {
        where: {
          name: Like(`%${search}%`),
          workspace: {
            id: wsId,
          },
        },
        relations: {
          workspace: true,
          creator: true,
          datasets: true,
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
        datasets: true,
        creator: true,
      },
    });

    if (!ds.workspace.users.some((u) => u.id === userId)) {
      BusinessException.throwForbidden();
    }

    return {
      meta: ds.getData(),
      datasets: ds.datasets,
    };
  }

  async update(userId: number, id: number, body: UpdateDatasourceDto) {
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

    ['name', 'ip', 'port', 'password', 'user', 'type', 'database'].forEach(
      (key) => {
        if (body[key]) {
          ds[key] = body[key];
        }
      },
    );

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
