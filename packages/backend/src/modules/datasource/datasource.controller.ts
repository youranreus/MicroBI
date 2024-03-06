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
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { DataSourceService } from './datasource.service';
import { ConnectTestDto, CreateDatasourceDto } from '@/dtos';
import { AuthRoles, UserParams } from '@reus-able/nestjs';
import { UserJwtPayload } from '@reus-able/types';

@Controller({
  path: 'datasource',
  version: [VERSION_NEUTRAL, '1'],
})
export class DataSourceController {
  constructor(private readonly service: DataSourceService) {}

  @Post()
  @AuthRoles('user')
  create(
    @UserParams() user: UserJwtPayload,
    @Body() body: CreateDatasourceDto,
  ) {
    return this.service.create(user.id, body);
  }

  @Get()
  @AuthRoles('user')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size = 10,
    @Query('workspace') workspace: string,
    @Query('search') search = '',
  ) {
    return this.service.findAll(page, size, +workspace, search);
  }

  @Get(':id')
  @AuthRoles('user')
  findOne(@UserParams() user: UserJwtPayload, @Param('id') id: string) {
    return this.service.findOne(user.id, +id);
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
  test(@Body() body: ConnectTestDto) {
    return this.service.test(body);
  }
}
