import { Module } from '@nestjs/common';
import { DataSourceService } from './datasource.service';
import { DataSourceController } from './datasource.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/User';
import { Workspace } from '@/entities/Workspace';
import { DataSource } from '@/entities/DataSource';

@Module({
  controllers: [DataSourceController],
  providers: [DataSourceService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Workspace, DataSource]),
  ],
})
export class DataSourceModule {}
