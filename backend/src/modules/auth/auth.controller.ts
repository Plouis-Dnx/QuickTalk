import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('logout')
  logout(): string {
    return 'Logs out the user and invalidates the session/token';
  }
}