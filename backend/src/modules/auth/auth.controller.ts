import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('register')
  register(): string {
    return 'Registers a new user and returns confirmation';
  }
}