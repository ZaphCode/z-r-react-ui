import { privAPIClient as privc } from "../lib/axios";
import { Card } from "../models";
import { handleError } from "../utils/functions";
import { APIResp, APIResult } from "./types";

export const getAuthUserCards = async (): Promise<Card[]> => {
  const resp = await privc.get<APIResp<Card[]>>(`/card/list`);
  return resp.data.data;
};

type SaveCardParam = {
  payment_id: string;
};

export const saveCardAPICall = async (
  data: SaveCardParam
): Promise<APIResult<Card>> => {
  try {
    const resp = await privc.post<APIResp<Card>>(`/card/save`, data, {
      withCredentials: true,
    });

    return [resp.data.data, null];
  } catch (error) {
    return handleError(error);
  }
};
