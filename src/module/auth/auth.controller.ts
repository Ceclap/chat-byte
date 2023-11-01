import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "@common/Dto/register.dto";
import { ApiTags } from "@nestjs/swagger";
import { JwtDto } from "@common/Dto/jwt.dto";
import { LoginDto } from "@common/Dto/login.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body()  data:RegisterDto ) {
    return await this.authService.register(data)
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data)
  }

  @Get('confirm/:access_token')
  async profile(@Param() { access_token }: JwtDto) {
    return await this.authService.confirm(access_token)
  }


}
