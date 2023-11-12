import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "@core/database/entity/task.entity";
import { Auth } from "@core/database/entity/auth.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports:[
  TypeOrmModule.forFeature([Task,Auth]),
  ],
  controllers: [TaskController],
  providers: [TaskService, JwtService]
})
export class TaskModule {}
