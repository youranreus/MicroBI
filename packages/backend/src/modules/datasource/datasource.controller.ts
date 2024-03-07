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
import {
  ConnectTestDto,
  CreateDatasourceDto,
  UpdateDatasourceDto,
} from '@/dtos';
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
  @AuthRoles('user')
  update(
    @UserParams() user: UserJwtPayload,
    @Param('id') id: string,
    @Body() body: UpdateDatasourceDto,
  ) {
    return this.service.update(user.id, +id, body);
  }

  @Delete(':id')
  @AuthRoles('user')
  remove(@UserParams() user: UserJwtPayload, @Param('id') id: string) {
    return this.service.remove(user.id, +id);
  }

  @Put()
  test(@Body() body: ConnectTestDto) {
    return this.service.test(body);
  }
}
