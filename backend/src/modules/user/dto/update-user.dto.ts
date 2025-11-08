import { IsOptional, IsString, IsBoolean, IsEmail } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString() 
    googleId: string;

    @IsOptional()
    @IsString() 
    username: string;

    @IsOptional()
    @IsEmail() 
    email: string;

    @IsOptional()
    @IsString() 
    profile_picture: string;

    @IsOptional()
    @IsString() 
    biography: string;

    @IsOptional()
    @IsBoolean()
    visibility: boolean;
}