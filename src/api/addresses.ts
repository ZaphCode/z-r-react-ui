import { privAPIClient as privc } from "../lib/axios";
import { Address } from "../models";
import { handleError } from "../utils/functions";
import { NewAddressSchemaType } from "../utils/schemas";
import { APIResp, APIResult } from "./types";

export const getAuthUserAddresses = async (): Promise<Address[]> => {
  const resp = await privc.get<APIResp<Address[]>>(`/address/list`);
  return resp.data.data;
};

export const createAddressAPICall = async (
  data: NewAddressSchemaType
): Promise<APIResult<Address>> => {
  try {
    const resp = await privc.post<APIResp<Address>>(`/address/create`, data, {
      withCredentials: true,
    });

    return [resp.data.data, null];
  } catch (error) {
    return handleError(error);
  }
};
