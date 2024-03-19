import { Injectable } from '@nestjs/common';
import { CreateChartDto, UpdateChartDto } from '@/dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Workspace } from '@/entities/Workspace';
import { BusinessException } from '@reus-able/nestjs';
import { Field } from '@/entities/Field';
import { Chart } from '@/entities/Chart';

@Injectable()
export class ChartService {
  @InjectRepository(Workspace)
  private wsRepo: Repository<Workspace>;

  @InjectRepository(Field)
  private fieldRepo: Repository<Field>;

  @InjectRepository(Chart)
  private repo: Repository<Chart>;

  private isValidUser(ws: Workspace, user: number) {
    return ws.users?.some((u) => u.id === user);
  }

  private async getFields(list: number[] = [], ws: number) {
    return await this.fieldRepo.find({
      where: {
        id: In(list),
        workspace: {
          id: ws,
        },
      },
      relations: {
        workspace: true,
      },
    });
  }

  async create(user: number, body: CreateChartDto) {
    const ws = await this.wsRepo.findOneOrFail({
      where: {
        id: body.workspace,
      },
      relations: {
        users: true,
      },
    });

    if (!this.isValidUser(ws, user)) {
      BusinessException.throwForbidden();
    }

    const quotas = await this.getFields(body.quotas, ws.id);
    const dims = await this.getFields(body.dims, ws.id);
    const filters = await this.getFields(body.filters, ws.id);

    const chart = this.repo.create({
      name: body.name,
      quotas,
      dims,
      filters,
      type: body.type,
      workspace: ws,
      owner: ws.users.find((u) => u.id === user),
    });

    await this.repo.save(chart);
    return null;
  }

  findAll() {
    return `This action returns all chart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chart`;
  }

  async update(user: number, id: number, body: UpdateChartDto) {
    const chart = await this.repo.findOneOrFail({
      where: {
        id,
        owner: {
          id: user,
        },
      },
      relations: {
        dims: true,
        quotas: true,
        filters: true,
        owner: true,
        workspace: true,
      },
    });

    chart.quotas = await this.getFields(body.quotas, chart.workspace.id);
    chart.dims = await this.getFields(body.dims, chart.workspace.id);
    chart.filters = await this.getFields(body.filters, chart.workspace.id);

    chart.type = body.type;
    chart.name = body.name;

    await this.repo.save(chart);

    return null;
  }

  remove(id: number) {
    return `This action removes a #${id} chart`;
  }
}