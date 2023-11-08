import {
  CanActivate,
  ExecutionContext,
  Injectable, UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import process from "process";
import { Request } from "express";

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const access_token = request.cookies.access_token
    if (!access_token ) {
      throw new UnauthorizedException();
    }
      request.user = await this.jwtService.verifyAsync(access_token , {
        secret: process.env['JWT_SECRET'],
      }).catch(async ()=> {
        const {access_token, payload} = await this.refresh(request)
        response.clearCookie('access_token')
        response.cookie('access_token', access_token, { httpOnly: true })
        return payload
      });
    return request.user;
  }

  async refresh(request:Request){
    const refresh_token = request.cookies.refresh_token
    if (!refresh_token ) {
      throw new UnauthorizedException();
    }
      const payload = await this.jwtService.verifyAsync(refresh_token , {
        secret: process.env['JWT_REFRESH_SECRET'],
      }).catch(()=>{
        throw new UnauthorizedException();
      });
      delete payload.iat;
      delete payload.exp;
      const access_token = await this.jwtService.signAsync(payload, {
        secret: process.env['JWT_REFRESH_SECRET'],
        expiresIn: process.env['JWT_EXPIRES_IN'],
      })
    return {
        access_token: access_token,
        payload: payload,
    }
  }
}
