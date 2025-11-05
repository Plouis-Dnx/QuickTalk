import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  getHello(): string {
    return 'Hello Users!';
  }

  @Get('goodbye')
  getGoodbye(): string {
    return 'Goodbye Users!';
  }
}