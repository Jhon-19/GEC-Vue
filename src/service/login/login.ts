import { AuthAPI } from "@/constants/auth.constant";
import gecRequest from "..";
import type { IDataType } from "../types";
import type {
  ILoginPayload,
  ILoginResult,
  IResetPasswordPayload,
} from "./types";
import { UserAPI } from "@/constants/user.constant";

export function loginRequest(loginPayload: ILoginPayload) {
  return gecRequest.post<IDataType<ILoginResult>>({
    url: AuthAPI.SignIn,
    data: loginPayload,
  });
}

export function resetPasswordRequest(
  resetPasswordPayload: IResetPasswordPayload
) {
  return gecRequest.post<IDataType<boolean>>({
    url: UserAPI.ResetPassword,
    data: resetPasswordPayload,
  });
}
