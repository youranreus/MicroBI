import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto, UpdateWorkspaceDto } from '@/dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/User';
import { Repository } from 'typeorm';
import { Workspace } from '@/entities/Workspace';

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

  findOne(id: number) {
    return `This action returns a #${id} workspace`;
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
