import { Injectable } from '@nestjs/common';
import { CreateDashboardDto, UpdateDashboardDto } from '@/dtos';

@Injectable()
export class DashboardService {
  create(body: CreateDashboardDto) {
    return body;
  }

  findAll() {
    return `This action returns all dashboard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, body: UpdateDashboardDto) {
    return body;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
