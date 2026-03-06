import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './dto/login-response.dto';
import { JwtAuthGuard } from './jwt-security/jwt.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(dto.token);
  }

  @Post('register')
  async register(@Body() dto: LoginDto): Promise<LoginResponse> {
    return this.authService.register(dto.token);
  }
  
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req) {
    const user = await this.authService.getMe(req.user.email) as any;
    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      profilePicture: user.profile_picture,
      biography: user.biography,
      visibility: user.visibility,
    };
  }
}