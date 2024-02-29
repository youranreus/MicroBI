import { Controller, Post, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { UserService } from './user.service';

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
}
