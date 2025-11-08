// src/auth/dto/login-response.dto.ts
import { User } from '../../user/user.schema'

export interface LoginResponse {
  access_token: string;
  user: User;
}