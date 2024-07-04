import { privAPIClient as privc } from "../lib/axios";
import { Card } from "../models";
import { APIResp } from "./types";

export const getAuthUserCards = async (): Promise<Card[]> => {
  const resp = await privc.get<APIResp<Card[]>>(`/card/list`);
  return resp.data.data;
};
