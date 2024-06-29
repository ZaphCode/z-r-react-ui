import { FC } from "react";
import { CheckoutTab } from "../../../utils/tabs";
import { useCheckoutTabsStore } from "../../../stores/checkoutTabs";

interface Props {
  tab: CheckoutTab;
}

const CheckoutTabComp: FC<Props> = ({ tab: { name, active, icon } }) => {
  const setSelectedTab = useCheckoutTabsStore((store) => store.setSelectedTab);

  return (
    <button
      onClick={() => {
        setSelectedTab(name);
      }}
      disabled={!active}
      className={`${
        active ? "bg-neutral-900" : "bg-gray-600"
      } shadow-lg shadow-gray-400 w-12 h-12 rounded-full flex justify-center items-center text-white`}
    >
      {icon}
    </button>
  );
};

export default CheckoutTabComp;
