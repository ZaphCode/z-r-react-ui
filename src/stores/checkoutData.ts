import {Address, Card} from "../models";
import {create} from "zustand";

interface Data {
    selectedAddress: Address
    selectedPaymentMethod: Card
}

export const useCheckoutDataStore = create<Data>(() => ({
    selectedAddress: {} as Address,
    selectedPaymentMethod: {} as Card
}));
