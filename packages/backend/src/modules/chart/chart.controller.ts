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

@Controller({
  path: 'chart',
  version: [VERSION_NEUTRAL, '1'],
})
export class ChartController {
  constructor(private readonly chartService: ChartService) {}

  @Post()
  create(@Body() createChartDto: CreateChartDto) {
    return this.chartService.create(createChartDto);
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
  update(@Param('id') id: string, @Body() updateChartDto: UpdateChartDto) {
    return this.chartService.update(+id, updateChartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chartService.remove(+id);
  }
}
