import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(): string {
    return 'Authenticates a user and returns a token';
  }
}