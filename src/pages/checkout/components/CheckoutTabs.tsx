import { useCheckoutTabsStore } from "../../../stores/checkoutTabs";
import CheckoutTabComp from "./CheckoutTab";

const CheckoutTabs = () => {
  const checkoutTabs = useCheckoutTabsStore((state) => state.tabs);
  return (
    <div className="flex flex-row gap-x-4 justify-center items-baseline">
      {checkoutTabs.map((tab, index) => (
        <div className="flex gap-x-4 justify-center">
          <CheckoutTabComp key={index} tab={tab} />
          {index < checkoutTabs.length - 1 && <CheckoutTabDivider />}
        </div>
      ))}
    </div>
  );
};

const CheckoutTabDivider = () => {
  return <div className="w-10 pt-2.5 flex justify-center text-center">---</div>;
};

export default CheckoutTabs;
