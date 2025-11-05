import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get(':id')
  getUserById(@Param('id') id: string): string {
    return `Return data for user with ID: ${id}`;
  }
}