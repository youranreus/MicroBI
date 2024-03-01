import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto, UpdateWorkspaceDto } from '@/dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/User';
import { Repository } from 'typeorm';
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

  findAll() {
    return `This action returns all workspace`;
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

  async getUser(userId: number, id: number) {
    const ws = await this.wsRepo.findOneOrFail({
      where: { id },
      relations: {
        users: true,
        datasources: true,
      },
    });

    if (!ws.users.some((u) => u.id === userId)) {
      BusinessException.throwForbidden();
    }

    return ws.users.map((u) => u.getData());
  }

  update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    return {
      id,
      updateWorkspaceDto,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} workspace`;
  }
}
