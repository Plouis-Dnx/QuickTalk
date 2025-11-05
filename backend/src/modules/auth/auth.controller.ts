import { Controller, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post('login')
  login(): string {
    return 'Authenticates a user and returns a token';
  }
}