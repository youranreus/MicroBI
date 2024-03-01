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
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from '../../dtos/workspace/create-workspace.dto';
import { UpdateWorkspaceDto } from '../../dtos/workspace/update-workspace.dto';
import { AuthRoles, UserParams } from '@reus-able/nestjs';
import { UserJwtPayload } from '@reus-able/types';

@Controller({
  path: 'workspace',
  version: [VERSION_NEUTRAL, '1'],
})
export class WorkspaceController {
  constructor(private readonly service: WorkspaceService) {}

  @Post()
  @AuthRoles('user')
  create(
    @UserParams() user: UserJwtPayload,
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ) {
    return this.service.create(user.id, createWorkspaceDto);
  }

  @Get()
  @AuthRoles('user')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size = 10,
    @Query('search') search = '',
  ) {
    return this.service.findAll(page, size, search);
  }

  @Get(':id')
  @AuthRoles('user')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Get(':id/user')
  @AuthRoles('user')
  getUser(@UserParams() user: UserJwtPayload, @Param('id') id: string) {
    return this.service.getUser(user.id, +id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.service.update(+id, updateWorkspaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
