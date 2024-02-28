import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD, APP_PIPE, Reflector } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AuthGuard,
  BusinessException,
  HLOGGER_TOKEN,
  HLogger,
  LoggerModule,
} from '@reus-able/nestjs';
import { ENV_LIST } from './utils/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [...ENV_LIST],
    }),
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useFactory() {
        return new ValidationPipe({
          transform: true,
          exceptionFactory: (errors) => {
            const errorProperties = errors.map((e) => e.property).join(',');
            return new BusinessException(
              `参数校验失败，请检查 ${errorProperties}`,
            );
          },
        });
      },
    },
    {
      provide: APP_GUARD,
      useFactory(config: ConfigService, reflector: Reflector, logger: HLogger) {
        return new AuthGuard(config, logger, reflector);
      },
      inject: [ConfigService, Reflector, HLOGGER_TOKEN],
    },
  ],
})
export class AppModule {}
