import { Controller, Delete, Param } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Delete(':id')
  deleteUserById(@Param('id') id: string): string {
    return `Delete user with ID: ${id}`;
  }
}