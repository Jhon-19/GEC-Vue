import { AuthAPI } from "@/constants/auth.constant";
import gecRequest from "..";
import type { IDataType } from "../types";
import type { ISignupPayload } from "./types";

export function signupRequest(signupPayload: ISignupPayload) {
  return gecRequest.post<IDataType<string>>({
    url: AuthAPI.SignUp,
    data: signupPayload,
  });
}
