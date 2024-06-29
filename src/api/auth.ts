import { pubAPIClient } from "../lib/axios";
import { handleError } from "../utils/functions";
import { APIResp, APIResult, SigninData } from "./types";

interface SigninAPICallParams {
  email: string;
  password: string;
  username?: string | undefined;
}

export const signinAPICall = async (
  data: SigninAPICallParams,
  isSignupMode: boolean
): Promise<APIResult<SigninData>> => {
  try {
    const resp = await pubAPIClient.post<APIResp<SigninData>>(
      isSignupMode ? "/auth/signup" : "/auth/signin",
      data,
      { withCredentials: true }
    );

    return [resp.data.data, null];
  } catch (error) {
    return handleError(error);
  }
};

export const signoutAPICall = async (): Promise<APIResult<null>> => {
  try {
    const resp = await pubAPIClient.get<APIResp<null>>(`/auth/signout`, {
      withCredentials: true,
    });

    return [resp.data.data, null];
  } catch (error) {
    return handleError(error);
  }
};

export const getOAuthURLAPICall = async (
  provider: string
): Promise<APIResult<string>> => {
  try {
    const resp = await pubAPIClient.get<APIResp<string>>(
      `/auth/${provider}/url`
    );

    return [resp.data.data, null];
  } catch (error) {
    return handleError(error);
  }
};
