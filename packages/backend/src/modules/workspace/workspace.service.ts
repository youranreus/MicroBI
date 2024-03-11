import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto, UpdateWorkspaceDto } from '@/dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/User';
import { Repository, Like, In } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Workspace } from '@/entities/Workspace';
import { BusinessException } from '@reus-able/nestjs';

@Injectable()
export class WorkspaceService {
  @InjectRepository(User)
  private userRepo: Repository<User>;

  @InjectRepository(Workspace)
  private wsRepo: Repository<Workspace>;

  async create(uid: number, { name }: CreateWorkspaceDto) {
    const user = await this.userRepo.findOneByOrFail({ id: uid });

    const ws = this.wsRepo.create({
      name,
      users: [user],
    });

    await this.wsRepo.save(ws);

    return null;
  }

  async findAll(page = 1, limit = 10, search = '') {
    const { items, meta } = await paginate<Workspace>(
      this.wsRepo,
      { page, limit },
      { where: { name: Like(`%${search}%`) } },
    );

    return {
      items: items.map((ws) => ws.getData()),
      total: meta.totalItems,
    };
  }

  async findOne(id: number) {
    const ws = await this.wsRepo.findOneOrFail({
      where: { id },
      relations: {
        users: true,
        datasources: true,
      },
    });

    const result = ws.getData();

    return {
      ...result,
      users: result.users.map((u) => u.id),
    };
  }

  async getUser(_userId: number, id: number) {
    const ws = await this.wsRepo.findOneOrFail({
      where: { id },
      relations: {
        users: true,
        datasources: true,
      },
    });

    // if (!ws.users.some((u) => u.id === userId)) {
    //   BusinessException.throwForbidden();
    // }

    return ws.users.map((u) => u.getData());
  }

  async update(userId: number, id: number, body: UpdateWorkspaceDto) {
    const ws = await this.wsRepo.findOneOrFail({
      where: { id },
      relations: {
        users: true,
      },
    });

    if (!ws.users.some((u) => u.id === userId)) {
      BusinessException.throwForbidden();
    }

    (['logo', 'name'] as const).forEach((key) => {
      if (body[key]) {
        ws[key] = body[key];
      }
    });

    if (Array.isArray(body.users)) {
      const users = await this.userRepo.findBy({
        id: In(body.users),
      });

      ws.users = users;
    }

    await this.wsRepo.save(ws);

    return null;
  }

  async remove(userId: number, id: number) {
    const ws = await this.wsRepo.findOneOrFail({
      relations: { users: true },
      where: { id },
    });

    if (!ws.users.some((u) => u.id === userId)) {
      BusinessException.throwForbidden();
    }

    await this.wsRepo.remove(ws);
    return null;
  }

  async getUserWorkspace(userId: number, page = 1, limit = 10, search = '') {
    const { items, meta } = await paginate<Workspace>(
      this.wsRepo,
      { page, limit },
      {
        where: {
          name: Like(`%${search}%`),
          users: {
            id: userId,
          },
        },
        relations: {
          users: true,
        },
      },
    );

    return {
      items: items.map((ws) => ws.getData()),
      total: meta.totalItems,
    };
  }
}
