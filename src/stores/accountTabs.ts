import { create } from "zustand";
import { AccountTabOption } from "../utils/tabs";

interface Data {
  selectedTab: AccountTabOption;
}

interface Actions {
  setSelectedTab: (tab: AccountTabOption) => void;
}

export const useAccountTabsStore = create<Data & Actions>((set, get) => ({
  selectedTab: "Account Details",
  setSelectedTab: tab => set({ ...get(), selectedTab: tab }),
}));
