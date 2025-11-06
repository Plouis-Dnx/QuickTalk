import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }
}