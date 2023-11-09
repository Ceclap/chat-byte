import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { NestMinioModule } from "nestjs-minio";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "@core/database/entity/auth.entity";

@Module({
  imports:[
    TypeOrmModule.forFeature([Auth]),
    NestMinioModule.register({
      endPoint: '127.0.0.1',
      port: 9000,
      useSSL: false,
      accessKey: 'minio',
      secretKey: 'miniosecret',
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService, JwtService]
})
export class ImageModule {}
