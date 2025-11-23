import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './security/jwt.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req) {
    // req.user is injected by JwtStrategy after token validation
    const user = await this.authService.getMe(req.user.email);
    return user;
  }
}