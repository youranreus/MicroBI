import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  VERSION_NEUTRAL,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
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
  @AuthRoles('user')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size = 10,
    @Query('search') search = '',
    @UserParams() user: UserJwtPayload,
    @Query('workspace') workspace: number,
  ) {
    return this.dashboardService.findAll(
      page,
      size,
      user.id,
      +workspace,
      search,
    );
  }

  @Get(':id')
  @AuthRoles('user')
  findOne(@UserParams() user: UserJwtPayload, @Param('id') id: string) {
    return this.dashboardService.findOne(user.id, +id);
  }

  @Patch(':id')
  @AuthRoles('user')
  update(
    @Param('id') id: string,
    @UserParams() user: UserJwtPayload,
    @Body() updateDashboardDto: UpdateDashboardDto,
  ) {
    return this.dashboardService.update(+id, user.id, updateDashboardDto);
  }

  @Delete(':id')
  @AuthRoles('user')
  remove(@Param('id') id: string, @UserParams() user: UserJwtPayload) {
    return this.dashboardService.remove(+id, user.id);
  }
}
