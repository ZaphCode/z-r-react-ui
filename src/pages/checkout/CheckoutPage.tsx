import { useEffect } from "react";
import { NavbarTitle } from "../../components/Navbar";
import { useCheckoutTabsStore } from "../../stores/checkoutTabs";
import CartOverview from "./cart/CartOverview";
import CheckoutTabs from "./components/CheckoutTabs";
import ConfirmationView from "./confirmation/ConfirmationView";
import PaymentView from "./payment/PaymentView";
import ShippingView from "./shipping/ShippingView";

const CheckoutPage = () => {
  const setSelectedTab = useCheckoutTabsStore((store) => store.setSelectedTab);

  useEffect(() => {
    return () => {
      setSelectedTab("Cart");
    };
  }, []);

  return (
    <div>
      <div className="flex justify-center pt-5 mt-5">
        <NavbarTitle small={false} />
      </div>
      <div className="mt-8 mx-auto w-2/3">
        <CheckoutTabs />
        <div className="py-5">
          <CheckoutTabsSwitch />
        </div>
      </div>
    </div>
  );
};

const CheckoutTabsSwitch = () => {
  const activeTab = useCheckoutTabsStore((store) => store.selectedTab);

  const tabs = {
    Cart: <CartOverview />,
    Shipping: <ShippingView />,
    Payment: <PaymentView />,
    Confirmation: <ConfirmationView />,
  };

  return tabs[activeTab];
};

export default CheckoutPage;
