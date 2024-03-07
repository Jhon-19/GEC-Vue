export interface ILoginPayload {
  username: string;
  password: string;
}

export interface ILoginResult {
  id: string;
  token: string;
}

export interface IResetPasswordPayload {
  username: string;
  email: string;
  password: string;
}
