import type { Role } from "@/constants/user.constant";

export interface IUserInfo {
  fullName: string;
  phoneNumber: string;
  username: string;
  email: string;
  role: keyof typeof Role;
}

export interface IRoleUser {
  id: string;
  username: string;
  fullName?: string;
  role: keyof typeof Role;
}

export interface IUserInfoPayload {
  id: string;
  fullName: string;
  phoneNumber: string;
}

export interface IChangePasswordPayload {
  id: string;
  oldPassword: string;
  newPassword: string;
}

export interface IChangeUserRolePayload {
  adminId: string;
  id: string;
  role: keyof typeof Role;
}
