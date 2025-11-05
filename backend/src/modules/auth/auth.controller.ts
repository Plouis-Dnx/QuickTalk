import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('me')
  getMe() : string {
    return "Return connected user's datas";
  }
}