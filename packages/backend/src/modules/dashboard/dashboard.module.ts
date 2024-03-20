import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Chart, Dashboard, Workspace } from '@/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [TypeOrmModule.forFeature([Dashboard, Chart, Workspace])],
})
export class DashboardModule {}
