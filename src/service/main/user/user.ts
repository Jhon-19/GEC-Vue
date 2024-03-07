import gecRequest from "@/service";
import type { IDataType } from "@/service/types";
import type { IUserInfo } from "./types";
import { UserAPI } from "@/constants/user.constant";
import type { IUserInfoPayload } from "@/stores/main/user/types";

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
