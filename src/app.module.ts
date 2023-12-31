import { Module, ValidationPipe } from "@nestjs/common";

import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { HttpExceptionFilter } from "@common/httpException.filter";
import { LoggingInterceptor } from "@common/Interceptor/logging.interceptor";
import process from "process";
import { HealthModule } from "@core/health/health.module";
import { CookieModule } from './module/cookie/cookie.module';
import { ImageModule } from "./module/image/image.module";
import { TaskModule } from "./module/task/task.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env['TYPEORM_HOST'],
      port: 5432,
      username: process.env['TYPEORM_USERNAME'],
      password: process.env['TYPEORM_PASSWORD'],
      database: process.env['TYPEORM_DATABASE'],
      synchronize: true,
      entities: [`${__dirname}/core/database/entity/*.entity{.ts,.js}`],
      migrationsTableName: 'migrations',
      migrations: [`${__dirname}/core/database/migrations/*{.ts,.js}`],
    }),
    HealthModule,
    AuthModule,
    CookieModule,
    ImageModule,
    TaskModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useValue: new HttpExceptionFilter(),
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: new LoggingInterceptor(),
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true, transform: true }),
    },
  ],
})
export class AppModule {}
