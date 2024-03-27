import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  VERSION_NEUTRAL,
  Put,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { DataSetService } from './dataset.service';
import { UserParams, AuthRoles } from '@reus-able/nestjs';
import { UserJwtPayload } from '@reus-able/types';
import {
  CreateDataSetDto,
  UpdateDataSetDto,
  DatasetFieldCreateDto,
  DatasetFieldUpdateDto,
  QueryDataDto,
} from '@/dtos';

@Controller({
  path: 'dataset',
  version: [VERSION_NEUTRAL, '1'],
})
export class DataSetController {
  constructor(private readonly dataSetService: DataSetService) {}

  @Post()
  @AuthRoles('user')
  create(@UserParams() user: UserJwtPayload, @Body() body: CreateDataSetDto) {
    return this.dataSetService.create(user.id, body);
  }

  @Get()
  @AuthRoles('user')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size = 10,
    @Query('workspace') workspace?: string,
    @Query('datasource') datasource?: string,
    @Query('search') search = '',
  ) {
    return this.dataSetService.findAll(
      page,
      size,
      { workspace, datasource },
      search,
    );
  }

  @Get(':id')
  @AuthRoles('user')
  findOne(@UserParams() user: UserJwtPayload, @Param('id') id: string) {
    return this.dataSetService.findOne(user.id, +id);
  }

  @Post(':id/query')
  @AuthRoles('user')
  @HttpCode(200)
  queryData(
    @UserParams() user: UserJwtPayload,
    @Param('id') id: string,
    @Body() body: QueryDataDto,
  ) {
    return this.dataSetService.queryData(user.id, +id, body);
  }

  @Patch(':id')
  @AuthRoles('user')
  update(
    @UserParams() user: UserJwtPayload,
    @Param('id') id: string,
    @Body() body: UpdateDataSetDto,
  ) {
    return this.dataSetService.update(user.id, +id, body);
  }

  @Delete(':id')
  @AuthRoles('user')
  remove(@UserParams() user: UserJwtPayload, @Param('id') id: string) {
    return this.dataSetService.remove(user.id, +id);
  }

  @Put(':id')
  @AuthRoles('user')
  getCol(
    @UserParams() user: UserJwtPayload,
    @Param('id') id: string,
    @Query('table') table: string,
  ) {
    return this.dataSetService.getColumn(+id, user.id, table);
  }

  @Post(':id/field')
  @AuthRoles('user')
  addField(
    @UserParams() user: UserJwtPayload,
    @Param('id') id: string,
    @Body() body: DatasetFieldCreateDto,
  ) {
    return this.dataSetService.addField(user.id, +id, body);
  }

  @Get(':id/field')
  @AuthRoles('user')
  getFields(@UserParams() user: UserJwtPayload, @Param('id') id: string) {
    return this.dataSetService.getFields(user.id, +id);
  }

  @Get(':id/preview')
  @AuthRoles('user')
  getPreview(@UserParams() user: UserJwtPayload, @Param('id') id: string) {
    return this.dataSetService.previewData(user.id, +id);
  }

  @Patch(':dsId/field/:id')
  @AuthRoles('user')
  updateField(
    @UserParams() user: UserJwtPayload,
    @Param('dsId') dsId: string,
    @Param('id') id: string,
    @Body() body: DatasetFieldUpdateDto,
  ) {
    return this.dataSetService.updateField(user.id, +id, +dsId, body);
  }

  @Delete(':dsId/field/:id')
  @AuthRoles('user')
  deleteField(
    @UserParams() user: UserJwtPayload,
    @Param('dsId') dsId: string,
    @Param('id') id: string,
  ) {
    return this.dataSetService.deleteField(user.id, +id, +dsId);
  }
}
