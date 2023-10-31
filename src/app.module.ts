import { Module, ValidationPipe } from "@nestjs/common";

import { AuthModule } from './module/auth/auth.module';
import process from "process";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "@common/Entity/auth.entity";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { HttpExceptionFilter } from "@common/httpException.filter";
import { LoggingInterceptor } from "@common/Interceptor/logging.interceptor";

@Module({
  imports: [AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env['DATABASE_HOST'],
      port: 5432,
      username: process.env['DATABASE_USERNAME'],
      password: process.env['DATABASE_PASSWORD'],
      database: process.env['DATABASE'],
      synchronize: true,
      entities: [Auth],
    }),
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
