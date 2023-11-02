import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "@common/Dto/register.dto";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtDto } from "@common/Dto/jwt.dto";
import { LoginDto } from "@common/Dto/login.dto";
import { RefreshGuard } from "@common/Guards/refresh.guard";
import { Client } from "@common/decorators/client.decorator";

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

  @UseGuards(RefreshGuard)
  @Get('refresh')
  async refresh(@Client() {id}: { id: string }) {
    return await this.authService.refresh(id)
  }

  @ApiParam({ name: 'username', type: String, description: 'Verify if username name is free' })
  @Get('username/:username')
  async username(@Param() { username }: {username: string }) {
    return await this.authService.username(username)
  }

}
