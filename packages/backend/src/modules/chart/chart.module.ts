import { Module } from '@nestjs/common';
import { ChartService } from './chart.service';
import { ChartController } from './chart.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chart } from '@/entities/Chart';
import { Field } from '@/entities/Field';

@Module({
  controllers: [ChartController],
  providers: [ChartService],
  imports: [ConfigModule, TypeOrmModule.forFeature([Field, Chart])],
})
export class ChartModule {}
