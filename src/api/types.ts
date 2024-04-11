import { User } from "../models";

export type APIError = { message: string };
export type APIResult<T> = [T, null] | [null, APIError];

export interface APIResp<T> {
  status: "success";
  message: string;
  data: T;
}

export interface SigninData {
  user: User;
  access_token: string;
  refresh_token: string;
}
