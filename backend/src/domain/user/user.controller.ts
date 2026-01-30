import { Controller, Get, Param, Patch, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  updateUserById(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUserById(id);
  }
}