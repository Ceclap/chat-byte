import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiCookieAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TaskDto } from "@common/dto/task.dto";
import { TaskService } from "./task.service";
import { TaskModifyDto } from "@common/dto/taskModify.dto";
import { AuthGuard } from "@common/guards/auth.guard";

@ApiTags('task')
@Controller('task')
export class TaskController {

  constructor(private readonly taskService: TaskService) {
  }


  @ApiResponse({
    schema: {
      properties: {
        taskId: {
          type: 'string',
          example: '5fb917b8-2b9f-4c8d-a107-c9b7db61da0d',
        },
      },
    },
    status: 200,
    description: 'Ok',
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Post()
  async createTask(@Body() data: TaskDto) {
    return this.taskService.createTask(data);
  }


  @ApiResponse({
    status: 200,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'e63d0d76-5588-442c-8e64-66c78eb23ef2' },
            userId: { type: 'string', example: '24e97094-ed3e-4378-b013-d9b31c110333' },
            title: { type: 'string', example: 'Write a email' },
            text: { type: 'string', example: 'Write a email to my Harry' },
            createAt: { type: 'string', format: 'date-time', example: '2023-11-12T13:57:24.786Z' },
            updateAt: { type: 'string', format: 'date-time', example: '2023-11-12T13:57:24.786Z' },
          },
        },
      },
    },
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id', type: String, description: 'UUID of the Task' })
  async getTask(@Param() id: {id: string}) {
    return this.taskService.getTask(id);
  }

  @ApiResponse({
    schema: {
      properties: {
        taskId: {
          type: 'string',
          example: '5fb917b8-2b9f-4c8d-a107-c9b7db61da0d',
        },
      },
    },
    status: 200,
    description: 'Ok',
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiParam({ name: 'id', type: String, description: 'UUID of the Task' })
  async modifyTask(@Param() id: {id: string} ,@Body() data: TaskModifyDto) {
    return this.taskService.modifyTask(id, data);
  }

  @ApiResponse({
    schema: {
      properties: {
        taskId: {
          type: 'string',
          example: '5fb917b8-2b9f-4c8d-a107-c9b7db61da0d',
        },
      },
    },
    status: 200,
    description: 'Ok',
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', type: String, description: 'UUID of the Task' })
  @Delete(':id')
  async deleteTask(@Param() id: {id: string}) {
    return this.taskService.deleteTask(id);
  }

}
