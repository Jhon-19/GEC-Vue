export interface ILoginPayload {
  username: string;
  password: string;
}

export interface ILoginResult {
  id: number;
  token: string;
}
