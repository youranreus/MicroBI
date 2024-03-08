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
} from '@nestjs/common';
import { DataSetService } from './dataset.service';
import { UserParams, AuthRoles } from '@reus-able/nestjs';
import { UserJwtPayload } from '@reus-able/types';

@Controller({
  path: 'dataset',
  version: [VERSION_NEUTRAL, '1'],
})
export class DataSetController {
  constructor(private readonly dataSetService: DataSetService) {}

  @Post()
  create(@Body() createDataSetDto) {
    return this.dataSetService.create(createDataSetDto);
  }

  @Get()
  findAll() {
    return this.dataSetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataSetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDataSetDto) {
    return this.dataSetService.update(+id, updateDataSetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataSetService.remove(+id);
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
}
