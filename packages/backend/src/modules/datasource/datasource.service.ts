import { ConnectTestDto } from '@/dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DataSourceService {
  create() {
    return 'This action adds a new datasource';
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

  async test(conn: ConnectTestDto) {
    return conn;
  }
}
