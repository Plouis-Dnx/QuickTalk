import { Controller, Put, Param } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Put(':id')
  updateUserById(@Param('id') id: string): string {
    return `Update user information for ID: ${id}`;
  }
}