export enum UserAPI {
  CheckAuth = "/users/check-auth",
  UserInfo = "/users/user-info",
  ResetPassword = "/users/reset-password",
  ChangePassword = "/users/change-password",
  GetAllUsers = "/users/",
  ChangeUserRole = "/users/role-manage",
}

export enum Role {
  "admin" = "超级管理员",
  "manager" = "管理员",
  "staff" = "用户",
}

export const GEC_INDEX = "index";
