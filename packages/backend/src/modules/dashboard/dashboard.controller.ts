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
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto, UpdateDashboardDto } from '@/dtos';
import { AuthRoles, UserParams } from '@reus-able/nestjs';
import { UserJwtPayload } from '@reus-able/types';

@Controller({
  path: 'dashboard',
  version: [VERSION_NEUTRAL, '1'],
})
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  @AuthRoles('user')
  create(
    @UserParams() user: UserJwtPayload,
    @Body() createDashboardDto: CreateDashboardDto,
  ) {
    return this.dashboardService.create(user.id, createDashboardDto);
  }

  @Get()
  findAll() {
    return this.dashboardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDashboardDto: UpdateDashboardDto,
  ) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id);
  }
}
