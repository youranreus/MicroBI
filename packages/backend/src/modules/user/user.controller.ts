import {
  Body,
  Controller,
  Patch,
  Post,
  Query,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthRoles, UserParams } from '@reus-able/nestjs';
import { UserJwtPayload } from '@reus-able/types';
import { UserNameUpdateDto } from '@/dtos';

@Controller({
  path: 'user',
  version: [VERSION_NEUTRAL, '1'],
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Query('token') token: string) {
    return this.userService.create(token);
  }

  @Patch()
  @AuthRoles('user')
  updateName(
    @UserParams() user: UserJwtPayload,
    @Body() body: UserNameUpdateDto,
  ) {
    return this.userService.updateName(user.id, body.name);
  }
}
