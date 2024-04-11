import { isAxiosError } from "axios";
import { APIResult } from "../api/types";

export function handleError<T>(error: unknown): APIResult<T> {
  let errorResult = { message: "Error calling api" };

  if (isAxiosError(error)) {
    errorResult.message = error.response?.data.message;
  }
  return [null, errorResult];
}

export function parseAPIError(error: unknown): Error {
  let errorResult = new Error("Error calling Api");

  if (isAxiosError(error)) {
    errorResult = new Error(error.response?.data.message);
  }
  return errorResult;
}
