import { NavbarTitle } from "../../components/Navbar";
import SelectAddressView from "./address/SelectAddressView";
import CartOverview from "./cart/CartOverview";
import CheckoutTabs from "./components/CheckoutTabs";

const CheckoutPage = () => {
  return (
    <div>
      <div className="flex justify-center pt-5 mt-5">
        <NavbarTitle small={false} />
      </div>
      <div className="mt-8 mx-auto w-2/3">
        <CheckoutTabs />
        <div className="py-5">
          {/* <CartOverview /> */}
          <SelectAddressView />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
