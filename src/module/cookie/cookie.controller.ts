import { Controller, Get, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('cookie')
@Controller('cookie')
export class CookieController {

  // @Get('ping')
  // ping(@Req() req: any) {
  //   console.log(req.cookies);
  //   return 'pong';
  // }
  //
  // @ApiCookieAuth()
  // @Get('pong')
  // findAll(@Cookies() cookie: { [key: string]: string }) {
  //   console.log(cookie);
  // }
  //
  // @Get('setCookie')
  // setCookie(@Res({ passthrough: true }) response: any) {
  //   response.cookie('auth', '123');
  //   response.send('Cookie setat!');
  // }
  //
  // @Get('deleteCookie')
  // deleteCookie(@Res({ passthrough: true }) response: any) {
  //   response.clearCookie('auth');
  //   response.send('Cookie șters!');
  // }

  @Get('clear')
  async clear(@Res() response: any) {
    response.clearCookie('access_token', { httpOnly: true });
    response.clearCookie('refresh_token', { httpOnly: true });
    response.send('Cookie șters!');
  }
}
