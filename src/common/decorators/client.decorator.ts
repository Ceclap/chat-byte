import { createParamDecorator, ExecutionContext, HttpException } from "@nestjs/common";

export const Client = createParamDecorator(
  (_,ctx: ExecutionContext) => {
    try{
      const request = ctx.switchToHttp().getRequest();
      delete request.user.iat;
      delete request.user.exp;
      return request.user;
    }catch (e) {
        throw new HttpException('Unauthorized', 401)
    }

  },
);
