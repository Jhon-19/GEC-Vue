import type { Role } from "@/constants/user.constant";

export interface IUserInfoState {
  fullName: string;
  phoneNumber: string;
  username: string;
  email: string;
  role: Role;
  id: string;
}
