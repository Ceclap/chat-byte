import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "@common/Dto/register.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtDto } from "@common/Dto/jwt.dto";
import { LoginDto } from "@common/Dto/login.dto";
import { RefreshGuard } from "@common/Guards/refresh.guard";
import { Client } from "@common/decorators/client.decorator";
import { VerifyDto } from "@common/Dto/verify.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}


  @ApiResponse({
    schema: {
      properties: {
        message: {
          type: 'string',
          example: 'success'
                    },
      },
    },
    status: 201,
    description: 'Ok',
  })
  @Post('register')
  async register(@Body()  data:RegisterDto ) {
    return await this.authService.register(data)
  }

  @ApiResponse({
    schema: {
      properties: {
        access_token: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNiNzQzZTE3LTBkNjgtNDYyYS1hZDE0LTdjN2YyZGI3YmE4MyIsImVtYWlsIjoibmliZWgzODkxNUBnYW1lc3pveC5jb20iLCJpYXQiOjE2OTM5MTYxNDAsImV4cCI6MTY5MzkxNjY4MH0.tOmwZsmNc7ffAO6mXOpoIWAz7WhOUAMMd7Gog2FdqiU',
        },
        refresh_token: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNiNzQzZTE3LTBkNjgtNDYyYS1hZDE0LTdjN2YyZGI3YmE4MyIsImVtYWlsIjoibmliZWgzODkxNUBnYW1lc3pveC5jb20iLCJpYXQiOjE2OTM5MTYxNDAsImV4cCI6MTY5MzkxNjY4MH0.tOmwZsmNc7ffAO6mXOpoIWAz7WhOUAMMd7Gog2FdqiU',
        },
      },
    },
    status: 200,
    description: 'Ok',
  })
  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data)
  }

  @ApiResponse({
    schema: {
      properties: {
        userId: {
          type: 'string',
          example:'5fb917b8-2b9f-4c8d-a107-c9b7db61da0d',
        },
      },
    },
    status: 200,
    description: 'Ok',
  })
  @Get('confirm/:access_token')
  async profile(@Param() { access_token }: JwtDto) {
    return await this.authService.confirm(access_token)
  }


  @ApiResponse({
    schema: {
      properties: {
        access_token: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNiNzQzZTE3LTBkNjgtNDYyYS1hZDE0LTdjN2YyZGI3YmE4MyIsImVtYWlsIjoibmliZWgzODkxNUBnYW1lc3pveC5jb20iLCJpYXQiOjE2OTM5MTYxNDAsImV4cCI6MTY5MzkxNjY4MH0.tOmwZsmNc7ffAO6mXOpoIWAz7WhOUAMMd7Gog2FdqiU',
        },
      },
    },
    status: 200,
    description: 'Ok',
  })
  @UseGuards(RefreshGuard)
  @Get('refresh')
  async refresh(@Client() {id}: { id: string }) {
    return await this.authService.refresh(id)
  }

  @ApiResponse({
    schema: {
      properties: {
        message: {
          type: 'boolean',
          example: true
        },
      },
    },
    status: 200,
    description: 'Ok',
  })
  @Get('verify')
  async verify(@Query() critery: VerifyDto) {
    return await this.authService.verify(critery)
  }

}
