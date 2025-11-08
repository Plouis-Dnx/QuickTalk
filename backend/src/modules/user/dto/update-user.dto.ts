import { IsOptional, IsString, IsBoolean, IsEmail } from 'class-validator';

export class UpdateUserDto {
    @IsString() googleId: string;

    @IsString() username: string;

    @IsEmail() email: string;

    @IsOptional()
    @IsString() 
    profile_picture: string;

    @IsOptional()
    @IsString() 
    biography: string;

    @IsBoolean()
    visibility: boolean;
}