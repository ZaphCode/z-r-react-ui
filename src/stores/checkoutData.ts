import { Address } from "../models";
import { create } from "zustand";

interface CardTemp {
  payment_id: string;
  name: string;
  exp_month: number;
  exp_year: number;
  brand: string;
  last4: string;
}

interface Data {
  selectedAddress: Address | null;
  selectedPaymentMethod: CardTemp | null;
  saveNewCard: boolean;
}

interface Actions {
  setSelectAddress: (address: Address) => void;
  setSelectPaymentMethod: (card: CardTemp) => void;
  setSaveNewCard: (value: boolean) => void;
  resetData: () => void;
}

export const useCheckoutDataStore = create<Data & Actions>((set, get) => ({
  saveNewCard: false,
  selectedAddress: null,
  selectedPaymentMethod: null,
  setSaveNewCard(value: boolean) {
    set({ ...get(), saveNewCard: value });
  },
  setSelectAddress(address: Address) {
    set({ ...get(), selectedAddress: address });
  },
  setSelectPaymentMethod(card: CardTemp) {
    set({ ...get(), selectedPaymentMethod: card });
  },
  resetData() {
    set({ selectedAddress: null, selectedPaymentMethod: null });
  },
}));
