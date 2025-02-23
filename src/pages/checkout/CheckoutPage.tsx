import { useEffect } from "react";
import { NavbarTitle } from "../../components/Navbar";
import { useCheckoutTabsStore } from "../../stores/checkoutTabs";
import PaymentView from "./PaymentView";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CartOverviewView from "./CartOverviewView";
import ShippingView from "./ShippingView";
import ConfirmationView from "./ConfirmationView";
import CheckoutTabs from "../../components/CheckoutTabs";

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
    Cart: <CartOverviewView />,
    Shipping: <ShippingView />,
    Payment: <PaymentView />,
    Confirmation: <ConfirmationView />,
  };

  return tabs[activeTab];
};

export default CheckoutPage;
