// Used in AuthService
import { User } from '../../user/user.schema'

export interface LoginResponse {
  message?: string; // Optional message field for additional info
  access_token?: string;
  user: Partial<User>; // Return only necessary user fields to avoid exposing sensitive data
}