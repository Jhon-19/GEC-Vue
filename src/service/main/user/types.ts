import type { Role } from "@/constants/user.constant";

export interface IUserInfo {
  fullName: string;
  phoneNumber: string;
  username: string;
  email: string;
  role: keyof typeof Role;
}
