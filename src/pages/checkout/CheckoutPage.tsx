import { useEffect } from "react";
import { NavbarTitle } from "../../components/Navbar";
import { useCheckoutTabsStore } from "../../stores/checkoutTabs";
import CartOverview from "./cart/CartOverview";
import CheckoutTabs from "./components/CheckoutTabs";
import ConfirmationView from "./confirmation/ConfirmationView";
import PaymentView from "./payment/PaymentView";
import ShippingView from "./shipping/ShippingView";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51MOBXpG8UXDxPRbaBv41bKqV9i6l8bRHrk3SIIaAX82KIREPkczI6RE7fMS99fDc4uQxOnuZuuAfl3VyAjw4czYT00yxTqZ0PE"
);

const CheckoutPage = () => {
  const setSelectedTab = useCheckoutTabsStore((store) => store.setSelectedTab);

  // Reset selected tab when component unmounts
  useEffect(() => () => setSelectedTab("Cart"), []);

  return (
    <Elements stripe={stripePromise}>
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
    </Elements>
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
