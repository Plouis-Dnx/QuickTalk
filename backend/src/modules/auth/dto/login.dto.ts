import { IsString } from 'class-validator'

export class LoginDto {
    @IsString()
    token: string; // Google ID token sent from the frontend
}