import { User } from '@/entities';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { HLOGGER_TOKEN, HLogger } from '@reus-able/nestjs';
import { Repository } from 'typeorm';
import axios from 'axios';
import { BusinessException } from '@reus-able/nestjs';
import { UserJwtPayload, UserRole } from '@reus-able/types';
import { Restful } from '@/utils/types';
import { isNil } from 'lodash';
import * as jwt from 'jsonwebtoken';
import { UserDataUpdateDto } from '@/dtos';

@Injectable()
export class UserService {
  @Inject(HLOGGER_TOKEN)
  private logger: HLogger;

  @InjectRepository(User)
  private repo: Repository<User>;

  @Inject(ConfigService)
  private config: ConfigService;

  private log(text: string) {
    this.logger.log(text, UserService.name);
  }

  private async parseToken(token: string) {
    const url = this.config.get<string>('SSO_API', 'http://localhost:3000');
    const res = await axios.get<Restful<UserJwtPayload>>(
      `${url}/user/validate`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data.data;
  }

  async create(token: string) {
    const jwtPayload = (await this.parseToken(token).catch(() => {
      BusinessException.throwForbidden();
    })) as UserJwtPayload;

    let user = await this.repo.findOneBy({ email: jwtPayload.email });

    if (isNil(user)) {
      user = this.repo.create({
        email: jwtPayload.email,
        name: `User#${jwtPayload.id}`,
      });

      await this.repo.save(user);
    }

    const ticket = jwt.sign(
      {
        email: user.email,
        id: user.id,
        role: UserRole.USER,
        refresh: false,
      },
      this.config.get<string>('TOKEN_SECRET', ''),
      {
        expiresIn: '7d',
      },
    );

    return {
      token: ticket,
      user: user.getData(),
    };
  }

  async updateName(id: number, body: UserDataUpdateDto) {
    const user = await this.repo.findOneByOrFail({ id });

    user.name = body.name;
    user.avatar = body.avatar;
    await this.repo.save(user);

    return true;
  }
}
