import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  VERSION_NEUTRAL,
  Put,
  Body,
} from '@nestjs/common';
import { DataSourceService } from './datasource.service';
import { ConnectTestDto } from '@/dtos';
import { DataSource as DB } from 'typeorm';

@Controller({
  path: 'datasource',
  version: [VERSION_NEUTRAL, '1'],
})
export class DataSourceController {
  constructor(private readonly service: DataSourceService) {}

  @Post()
  create() {
    return this.service.create();
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.service.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  @Put()
  async test(@Body() body: ConnectTestDto) {
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
