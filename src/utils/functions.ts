import { isAxiosError } from "axios";
import { APIResult } from "../api/types";
import { Product } from "../models";

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

export function formatPrice(price: number) {
  return "$" + (price / 100).toFixed(2)
}

export function getDiscountPrice(product: Product): number {
  return product.price - product.price * (product.discount_rate / 100)
}