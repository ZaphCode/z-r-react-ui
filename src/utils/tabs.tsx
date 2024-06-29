import { BagIcon } from "../components/icons";
import AccDetailsIcon from "../components/icons/AccDetailsIcon";
import AddressIcon from "../components/icons/AddressIcon";
import CardIcon from "../components/icons/CardIcon";
import CheckIcon from "../components/icons/CheckIcon";
import OrdersIcon from "../components/icons/OrdersIcon";

export type AccountTabOption =
  | "Account Details"
  | "Orders"
  | "Addresses"
  | "Payment Methods";

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

export type CheckoutTabOption =
  | "Cart"
  | "Shipping"
  | "Payment"
  | "Confirmation";

export interface CheckoutTab {
  icon: JSX.Element;
  name: CheckoutTabOption;
  active: boolean;
}

export const checkoutTabs: CheckoutTab[] = [
  { name: "Cart", icon: <BagIcon />, active: true },
  { name: "Shipping", icon: <AddressIcon />, active: false },
  { name: "Payment", icon: <CardIcon />, active: false },
  { name: "Confirmation", icon: <CheckIcon />, active: false },
];
