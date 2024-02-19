import gecRequest from "..";
import type { IDataType } from "../types";
import type { ILoginPayload, ILoginResult } from "./types";

enum LoginAPI {
  SignIn = "/auth/signin",
}

export function loginRequest(loginPayload: ILoginPayload) {
  return gecRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.SignIn,
    data: loginPayload,
  });
}
