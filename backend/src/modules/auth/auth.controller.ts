import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() dto: LoginDto): Promise<LoginResponse> {
    return this.authService.register(dto.token);
  }
}