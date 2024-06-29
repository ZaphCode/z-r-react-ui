import { FC } from "react";
import { AddressIcon, BagIcon, CardIcon } from "../../../components/icons";
import CheckIcon from "../../../components/icons/CheckIcon";

const CheckoutTabs = () => {
  return (
    <div className="flex flex-row gap-x-4 justify-center items-baseline">
      <CheckoutTab icon={<BagIcon />} />
      <CheckoutTabDivider />
      <CheckoutTab icon={<AddressIcon />} />
      <CheckoutTabDivider />
      <CheckoutTab icon={<CardIcon />} />
      <CheckoutTabDivider />
      <CheckoutTab icon={<CheckIcon />} />
    </div>
  );
};

interface CheckoutProps {
  icon: JSX.Element;
}

const CheckoutTab: FC<CheckoutProps> = ({ icon }) => {
  return (
    <div className="bg-neutral-800 shadow-lg shadow-gray-400 w-12 h-12 rounded-full flex justify-center items-center text-white">
      {icon}
    </div>
  );
};

const CheckoutTabDivider = () => {
  return <div className="w-10 flex justify-center text-center">---</div>;
};

export default CheckoutTabs;
