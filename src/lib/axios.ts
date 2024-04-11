import axios, { AxiosInstance } from "axios";
import { APIResp } from "../models";

const API_URL = "http://localhost:9000/api";
const TOKEN_HEADER = "X-Access-Token";
const REFRESH_ENDPOINT = "/auth/refresh";

function createPrivateAPIClient(): AxiosInstance {
  const client = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

  client.interceptors.response.use(
    res => res,
    async err => {
      const originalConfig = err.config;

      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        const response = await client.get<APIResp<string>>(REFRESH_ENDPOINT);

        if (response.status === 200) {
          client.defaults.headers.common[TOKEN_HEADER] = response.data.data;

          return client(originalConfig);
        }
      }

      return err;
    }
  );

  return client;
}

function createPublicAPIClient(): AxiosInstance {
  const client = axios.create({
    baseURL: API_URL,
  });

  return client;
}

export const privAPIClient = createPrivateAPIClient();

export const pubAPIClient = createPublicAPIClient();
