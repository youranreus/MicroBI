import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/User';
import { Workspace } from '@/entities/Workspace';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  imports: [ConfigModule, TypeOrmModule.forFeature([User, Workspace])],
})
export class WorkspaceModule {}
