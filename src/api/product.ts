import { pubAPIClient } from "../lib/axios";
import { Product } from "../models";
import { APIResp } from "./types";

export const getAllProducts = async (): Promise<Product[]> => {
  const resp = await pubAPIClient.get<APIResp<Product[]>>(`/product/all`);
  return resp.data.data;
};

export const getProductByID = async (id: string): Promise<Product> => {
  const resp = await pubAPIClient.get<APIResp<Product>>(`/product/get/${id}`);
  return resp.data.data;
};
