import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { DataSourceService } from './datasource.service';

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
}
