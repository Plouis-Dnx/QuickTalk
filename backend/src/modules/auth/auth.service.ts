import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    private async verifyGoogleToken(idToken: string) {
        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
        if (!response.ok) throw new UnauthorizedException('invalid Google token');

        const userData = await response.json();
        if (userData.aud !== process.env.GOOGLE_CLIENT_ID) throw new UnauthorizedException('audience mismatch');

        return userData;
    }

    async refresh(refreshToken: string): Promise<{ access_token: string }> {
        const payload = await this.jwtService.verifyAsync<{ sub: string; email: string }>(refreshToken);

        const user = await this.userService.getUserByEmail(payload.email);
        if (!user) throw new UnauthorizedException('Utilisateur non trouvé');

        const newAccessToken = this.jwtService.sign(
            { sub: user._id, email: user.email },
            { expiresIn: '15m' }
        );

        return { access_token: newAccessToken };
    }
}