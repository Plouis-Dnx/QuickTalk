// Used in AuthService
import { User } from '../../user/user.schema'

export interface LoginResponse {
  access_token: string;
  user: User;
}