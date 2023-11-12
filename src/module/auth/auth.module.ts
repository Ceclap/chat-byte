import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "@core/database/entity/auth.entity";
import { MailService } from "../mail/mail.service";
import { MailModule } from "../mail/mail.module";
import { JwtService } from "@nestjs/jwt";
import { Task } from "@core/database/entity/task.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth,Task]),
    MailModule
],
  controllers: [AuthController],
  providers: [AuthService,MailService, JwtService],
})
export class AuthModule {}
