import AccountDropdown from "./components/AccountDropdown";
import AccountTabs from "./components/AccountTabs";
import { useAccountTabsStore } from "../../stores/accountTabs";
import Details from "./details/DetailsPage";
import Addresses from "./addresses/AddressesPage";
import Orders from "./orders/OrdersPage";
import PaymentMethods from "./payment/PaymentMethodsPage";

const Account = () => {
  return (
    <div>
      <h3 className="text-center my-3 text-xl tracking-widest pfont font-semibold p-2  text-neutral-900">
        DASHBOARD
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 container  mx-auto">
        <div className="lg:hidden mb-5">
          <AccountDropdown />
        </div>
        <div className="hidden lg:block">
          <AccountTabs />
        </div>
        <div className="mx-3 lg:col-span-2">
          <ActiveTab />
        </div>
      </div>
    </div>
  );
};

const ActiveTab = () => {
  const activeTab = useAccountTabsStore((store) => store.selectedTab);

  const tabs = {
    "Account Details": <Details />,
    "Payment Methods": <PaymentMethods />,
    Addresses: <Addresses />,
    Orders: <Orders />,
    Logout: <div></div>,
  };

  return tabs[activeTab];
};

export default Account;
