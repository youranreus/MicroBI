import { User } from '@/entities/User';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { HLOGGER_TOKEN, HLogger } from '@reus-able/nestjs';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  @Inject(HLOGGER_TOKEN)
  private logger: HLogger;

  @InjectRepository(User)
  private repo: Repository<User>;

  @Inject(ConfigService)
  private config: ConfigService;

  async create(token: string) {
    this.logger.log('注册');
    return {
      token,
      token_secret: this.config.get<string>('TOKEN_SECRET', 'default'),
      users: (await this.repo.find({})).map((u) => u.getData()),
    };
  }
}
