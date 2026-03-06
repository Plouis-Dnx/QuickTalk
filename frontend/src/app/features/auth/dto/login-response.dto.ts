// Used in AuthService
import { User } from "../../../shared/models/user.model";

export interface LoginResponse {
  message?: string; // Optional message field for additional info
  access_token?: string;
  user: Partial<User>; // Return only necessary user fields to avoid exposing sensitive data
}