import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async getMe(email: string): Promise<User> {
        const user = await this.userService.getUserByEmail(email);
        if (!user) throw new UnauthorizedException('Utilisateur non trouvé');
        return user;
    }
}