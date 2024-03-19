import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  VERSION_NEUTRAL,
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
  findAll() {
    return this.chartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chartService.findOne(+id);
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
