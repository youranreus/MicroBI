import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  VERSION_NEUTRAL,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ChartService } from './chart.service';
import { CreateChartDto, UpdateChartDto } from '@/dtos';
import type { UserJwtPayload } from '@reus-able/types';
import { AuthRoles, UserParams } from '@reus-able/nestjs';

@Controller({
  path: 'chart',
  version: [VERSION_NEUTRAL, '1'],
})
export class ChartController {
  constructor(private readonly chartService: ChartService) {}

  @Post()
  @AuthRoles('user')
  create(
    @UserParams() user: UserJwtPayload,
    @Body() createChartDto: CreateChartDto,
  ) {
    return this.chartService.create(user.id, createChartDto);
  }

  @Get()
  @AuthRoles('user')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size = 10,
    @Query('search') search = '',
    @UserParams() user: UserJwtPayload,
  ) {
    return this.chartService.findAll(page, size, user.id, search);
  }

  @Get(':id')
  @AuthRoles('user')
  findOne(@UserParams() user: UserJwtPayload, @Param('id') id: string) {
    return this.chartService.findOne(user.id, +id);
  }

  @Patch(':id')
  @AuthRoles('user')
  update(
    @UserParams() user: UserJwtPayload,
    @Param('id') id: string,
    @Body() updateChartDto: UpdateChartDto,
  ) {
    return this.chartService.update(user.id, +id, updateChartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chartService.remove(+id);
  }
}
