import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "@core/database/entity/task.entity";
import { Auth } from "@core/database/entity/auth.entity";
import { TaskDto } from "@common/dto/task.dto";
import { TaskModifyDto } from "@common/dto/taskModify.dto";

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {
  }

  async createTask(data: TaskDto) {
    const { userId } = data;
    const user = await this.authRepository.findOne({
      where: {
        id: userId,
      }
    })
    if(!user)
    {
      throw new HttpException('User not found', 404);
    }
    const task = await this.taskRepository.save({
      ...data,
    })
    return task.id;
  }

  async getTask(id: { id: string }) {
    const task = await this.taskRepository.findOne({
      where: id
    })
    if (!task) {
      throw new HttpException('Task not found', 404);
    }
    return task;
  }

  async modifyTask(id: { id: string }, data: TaskModifyDto) {
    const task = await this.taskRepository.findOne({
      where: id
    })
    if (!task) {
      throw new HttpException('Task not found', 404);
    }
    await this.taskRepository.update(task.id, {
      ...data,
    })
    return {
      taskId: id
    };
  }

  async deleteTask(id: { id: string }) {
    const task = await this.taskRepository.findOne({
      where: id
    })
    if (!task) {
      throw new HttpException('Task not found', 404);
    }
    await this.taskRepository.delete(task.id)
    return {
      taskId: id
    };
  }
}
