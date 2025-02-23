import AccountDropdown from "../../components/AccountDropdown";
import AccountTabs from "../../components/AccountTabs";
import { useAccountTabsStore } from "../../stores/accountTabs";
import AddressesView from "./AddressView";
import OrdersView from "./OrdersView";
import DetailsView from "./DetailsView";
import PaymentMethodsView from "./PaymentMethodsPage";

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
    "Account Details": <DetailsView />,
    "Payment Methods": <PaymentMethodsView />,
    Addresses: <AddressesView />,
    Orders: <OrdersView />,
  };

  return tabs[activeTab];
};

export default Account;
