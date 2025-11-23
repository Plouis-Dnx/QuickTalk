import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/login-response.dto';

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

    async login(idToken: string): Promise<LoginResponse> {
        const userData = await this.verifyGoogleToken(idToken);
        const user = await this.userService.getUserByEmail(userData.email);

        if (!user) throw new UnauthorizedException('Utilisateur non inscrit');

        const jwt = this.jwtService.sign({ sub: user._id, email: user.email });
        return { access_token: jwt, user };
    }
}