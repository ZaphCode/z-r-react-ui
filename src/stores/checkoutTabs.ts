import { create } from "zustand";
import { CheckoutTab, CheckoutTabOption, checkoutTabs } from "../utils/tabs";

interface Data {
  selectedTab: CheckoutTabOption;
  tabs: CheckoutTab[];
}

interface Actions {
  setSelectedTab: (tab: CheckoutTabOption) => void;
}

export const useCheckoutTabsStore = create<Data & Actions>((set, get) => ({
    selectedTab: "Cart",
    tabs: checkoutTabs,
    setSelectedTab: sTab => {
        set({ ...get(), selectedTab: sTab });

        const selectedIndex = get().tabs.findIndex(tab => tab.name === sTab);

        const updatedTabs = get().tabs.map((tab, index) => {
            if (index <= selectedIndex) {
                return { ...tab, active: true };
            } else {
                return { ...tab, active: false };
            }
        });

        set({ ...get(), tabs: updatedTabs });
    }
  }));
