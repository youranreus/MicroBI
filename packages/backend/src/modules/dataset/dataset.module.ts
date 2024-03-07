import { Module } from '@nestjs/common';
import { DataSetService } from './dataset.service';
import { DataSetController } from './dataset.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/User';
import { DataSource } from '@/entities/DataSource';
import { DataSet } from '@/entities/DataSet';

@Module({
  controllers: [DataSetController],
  providers: [DataSetService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, DataSource, DataSet]),
  ],
})
export class DataSetModule {}
