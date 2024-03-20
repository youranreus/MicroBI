import { Injectable } from '@nestjs/common';
import { CreateDashboardDto, UpdateDashboardDto } from '@/dtos';
import { Chart, Dashboard, Workspace } from '@/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BusinessException } from '@reus-able/nestjs';
import { isNil } from 'lodash';

@Injectable()
export class DashboardService {
  @InjectRepository(Dashboard)
  private repo: Repository<Dashboard>;

  @InjectRepository(Workspace)
  private wsRepo: Repository<Workspace>;

  @InjectRepository(Chart)
  private chartRepo: Repository<Chart>;

  private isValidUser(ws: Workspace, user: number) {
    return ws.users.find((u) => u.id === user);
  }

  async create(userId: number, body: CreateDashboardDto) {
    const ws = await this.wsRepo.findOneOrFail({
      where: { id: body.workspace },
      relations: {
        users: true,
      },
    });

    const user = this.isValidUser(ws, userId);

    if (isNil(user)) {
      BusinessException.throwForbidden();
    }

    const chartIds = body.charts.map((item) => item.chart);

    const charts = await this.chartRepo.find({
      where: {
        id: In(chartIds),
      },
    });

    const dashboard = this.repo.create({
      name: body.name,
      workspace: ws,
      creator: user,
      charts,
      positions: body.charts,
    });

    await this.repo.save(dashboard);

    return null;
  }

  findAll() {
    return `This action returns all dashboard`;
  }

  async findOne(userId: number, id: number) {
    const dashboard = await this.repo.findOneOrFail({
      where: {
        id,
      },
      relations: {
        workspace: {
          users: true,
        },
        creator: true,
        charts: {
          dims: true,
          quotas: true,
          filters: true,
        },
      },
    });

    if (isNil(this.isValidUser(dashboard.workspace, userId))) {
      BusinessException.throwForbidden();
    }

    return dashboard.getData();
  }

  update(id: number, body: UpdateDashboardDto) {
    return body;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
