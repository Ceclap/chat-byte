import { Controller, Get, Res } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('cookie')
@Controller('cookie')
export class CookieController {
  @ApiResponse({
    schema: {
      properties: {
        message: {
          type: 'string',
          example: 'Cookie șters!'
        },
      },
    },
    status: 200,
    description: 'Ok',
  })
  @Get('clear')
  async clear(@Res() response: any) {
    response.clearCookie('access_token', { httpOnly: true });
    response.clearCookie('refresh_token', { httpOnly: true });
    response.send({message:'Cookie șters!'});
  }
}
