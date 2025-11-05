import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('refresh')
  refresh(): string {
    return 'Refreshes the access token using a valid refresh token';
  }
}