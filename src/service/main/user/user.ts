import gecRequest from "@/service";
import type { IDataType } from "@/service/types";
import type {
  IChangePasswordPayload,
  IChangeUserRolePayload,
  IRoleUser,
  IUserInfo,
  IUserInfoPayload,
} from "./types";
import { UserAPI } from "@/constants/user.constant";

export function getUserInfoRequest(userId: string) {
  return gecRequest.get<IDataType<IUserInfo>>({
    url: UserAPI.UserInfo,
    params: { id: userId },
  });
}

export function changeUserInfoRequest(userInfoPayload: IUserInfoPayload) {
  return gecRequest.post<IDataType<boolean>>({
    url: UserAPI.UserInfo,
    data: userInfoPayload,
  });
}

export function changePasswordRequest(
  changePasswordPayload: IChangePasswordPayload
) {
  return gecRequest.post<IDataType<boolean>>({
    url: UserAPI.ChangePassword,
    data: changePasswordPayload,
  });
}

export function getAllUsersRequest() {
  return gecRequest.get<IDataType<IRoleUser[]>>({
    url: UserAPI.GetAllUsers,
  });
}

export function changeUserRoleRequest(
  changeUserRolePayload: IChangeUserRolePayload
) {
  return gecRequest.post<IDataType<boolean>>({
    url: UserAPI.ChangeUserRole,
    data: changeUserRolePayload,
  });
}
