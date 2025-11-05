import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get('hello')
  getHello(): string {
    return 'Hello Users!';
  }

  @Get('goodbye')
  getGoodbye(): string {
    return 'Goodbye Users!'
  }
}