import { privAPIClient as privc } from "../lib/axios";
import { Order } from "../models";
import { handleError } from "../utils/functions";
import { APIResp, APIResult } from "./types";

interface OrderItem {
  product_id: string;
  quantity: number;
}

interface NewOrderParam {
  address_id: string;
  payment_id: string;
  products: OrderItem[];
}

export const createOrderAPICall = async (
  data: NewOrderParam
): Promise<APIResult<Order>> => {
  try {
    const resp = await privc.post<APIResp<Order>>(`/order/new`, data, {
      withCredentials: true,
    });

    return [resp.data.data, null];
  } catch (error) {
    return handleError(error);
  }
};
