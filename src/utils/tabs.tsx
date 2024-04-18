import AccDetailsIcon from "../components/icons/AccDetailsIcon";
import AddressIcon from "../components/icons/AddressIcon";
import CardIcon from "../components/icons/CardIcon";
import LogoutIcon from "../components/icons/LogoutIcon";
import OrdersIcon from "../components/icons/OrdersIcon";

export type AccountTabOption =
  | "Account Details"
  | "Orders"
  | "Addresses"
  | "Payment Methods"
  | "Logout";

export interface AccountTab {
  icon: JSX.Element;
  name: AccountTabOption;
}

export const tabs: AccountTab[] = [
  { name: "Account Details", icon: <AccDetailsIcon /> },
  { name: "Orders", icon: <OrdersIcon /> },
  { name: "Addresses", icon: <AddressIcon /> },
  { name: "Payment Methods", icon: <CardIcon /> },
];
