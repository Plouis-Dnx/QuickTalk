import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/login-response.dto';
import { User } from '../user/user.schema';
import { access } from 'fs';

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

        if (!user) throw new UnauthorizedException('User not registered');

        const jwt = this.jwtService.sign({ sub: user._id, email: user.email });
        return {
            message: 'User logged in successfully', 
            user: {
                username: user.username,
                email: user.email
            },
            access_token: jwt
        }
    }
    
    async register(idToken: string): Promise<LoginResponse> {
        const userData = await this.verifyGoogleToken(idToken);

        //const existingUser = await this.userService.getUserByEmail(userData.email);
        //if (existingUser) throw new ConflictException('User already exists');

        let existingUser;
        try { existingUser = await this.userService.getUserByEmail(userData.email); }
        catch(error) { existingUser = null; }

        if (existingUser) throw new ConflictException('User already exists');

        const newUser = await this.userService.createUser({
            googleId: userData.sub,             // Google user ID
            username: userData.name,         
            email: userData.email,           
            profile_picture: userData.picture, 
            biography: '',                  
            visibility: true,                   // Public by default
        });

        const jwt = this.jwtService.sign({ sub: newUser._id, email: newUser.email });
        return {
            message: 'User registered successfully', 
            user: {
                username: newUser.username,
                email: newUser.email
            }
        }
    }
    
    async refresh(refreshToken: string): Promise<{ access_token: string }> {
        const payload = await this.jwtService.verifyAsync<{ sub: string; email: string }>(refreshToken);

        const user = await this.userService.getUserByEmail(payload.email);
        if (!user) throw new UnauthorizedException('User not found');

        const newAccessToken = this.jwtService.sign(
            { sub: user._id, email: user.email },
            { expiresIn: '15m' }
        );

        return { access_token: newAccessToken };
    }

    async getMe(email: string): Promise<User> {
        const user = await this.userService.getUserByEmail(email);
        if (!user) throw new UnauthorizedException('User not found');
        return user;
    }
}