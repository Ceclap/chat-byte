import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "@common/Entity/auth.entity";
import { MailService } from "../mail/mail.service";
import { MailModule } from "../mail/mail.module";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    MailModule
],
  controllers: [AuthController],
  providers: [AuthService,MailService, JwtService],
})
export class AuthModule {}
