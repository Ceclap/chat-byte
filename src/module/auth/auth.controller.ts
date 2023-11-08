import { Body, Controller, Get, Param, Post, Query, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { RegisterDto } from "@common/Dto/register.dto";
import { ApiCookieAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
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
        message: {
          type: 'string',
          example: 'success'
        },
      },
    },
    status: 200,
    description: 'Ok',
  })
  @Post('login')
  async login(@Body() data: LoginDto, @Res() response: Response) {
    const token = await this.authService.login(data)
    response.cookie('access_token', token.access_token, { httpOnly: true })
    response.cookie('refresh_token', token.refresh_token, { httpOnly: true })
    response.send({message: 'success' })
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

  @ApiCookieAuth()
  @UseGuards(RefreshGuard)
  @Get('salut')
    async salut(@Client() {id}: { id: string }) {
     return {
       id: id
     }
  }


}
