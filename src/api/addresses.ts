import { privAPIClient as privc } from "../lib/axios";
import { Address } from "../models";
import { APIResp } from "./types";

export const getAuthUserAddresses = async (): Promise<Address[]> => {
    const resp = await privc.get<APIResp<Address[]>>(`/address/list`);
    return resp.data.data;
};