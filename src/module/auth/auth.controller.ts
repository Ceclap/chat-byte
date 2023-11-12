import { Body, Controller, Get, Param, Post, Query, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { RegisterDto } from "@common/dto/register.dto";
import { ApiCookieAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtDto } from "@common/dto/jwt.dto";
import { LoginDto } from "@common/dto/login.dto";
import { VerifyDto } from "@common/dto/verify.dto";
import { Client } from "@common/decorators/client.decorator";
import { AuthGuard } from "@common/guards/auth.guard";
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
    status: 200,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'f1c2738f-cb47-4911-8585-b7635d94aabd' },
            email: { type: 'string', example: 'victor@gmail.com' },
            username: { type: 'string', example: 'victor' },
          },
        },
      },
    },
  })
  @Post('login')
  async login(@Body() data: LoginDto, @Res() response: Response) {
    const payload = await this.authService.login(data)
    response.cookie('access_token', payload.access_token)
    response.cookie('refresh_token', payload.refresh_token)
    response.send(payload.user)
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
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'f1c2738f-cb47-4911-8585-b7635d94aabd' },
            email: { type: 'string', example: 'victor@gmail.com' },
            username: { type: 'string', example: 'victor' },
          },
        },
      },
    },
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Client() id: { id:string }){
    return  await this.authService.me(id)
  }
}
