import { useState } from "react";
import { Address } from "../../../models";
import useFetch from "../../../hooks/useFetch";
import { getAuthUserAddresses } from "../../../api/addresses";
import { useCheckoutTabsStore } from "../../../stores/checkoutTabs";

const ShippingView = () => {
  const { data } = useFetch(getAuthUserAddresses, {});
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const setSelectedTab = useCheckoutTabsStore((store) => store.setSelectedTab);

  return (
    <div className="flex mt-4 flex-col items-center gap-4">
      <h3 className="pfont font-semibold">Shipping</h3>
      <div className="bg-white shadow-lg shadow-gray-200 w-3/5 py-3 px-2 ">
        <p
          className={`text-lg ${
            selectedAddress ? "font-semibold pl-2" : " text-neutral-400"
          }`}
        >
          {selectedAddress
            ? "✓" + "    " + selectedAddress.name
            : "❕ Select an address"}
        </p>
      </div>
      <div className="bg-white w-3/5 shadow-xl shadow-gray-200">
        {data !== null && data.length > 0 ? (
          <div className="flex flex-col gap-y-5 ">
            {data.map((addr) => (
              <div
                key={addr.id}
                className="bg-white border-b-2 border-gray-100"
              >
                <div className="flex justify-between items-centers p-3">
                  <div className="w-full">
                    <div className="flex justify-between">
                      <h5 className="text-lg font-semibold text-neutral-700">
                        {addr.name}
                      </h5>
                      <div>
                        <button
                          onClick={() => setSelectedAddress(addr)}
                          className={`text-gray-500  ${
                            selectedAddress?.id === addr.id &&
                            "text-gray-800 underline font-semibold"
                          }`}
                        >
                          select
                        </button>
                      </div>
                    </div>
                    <p className="text-neutral-500">
                      {addr.line1} - {addr.line2}
                    </p>
                    <p className="text-neutral-500">
                      {addr.city}, {addr.state} {addr.postal_code}
                    </p>
                    <p className="text-neutral-500">{addr.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>sexo</div>
        )}
      </div>
      <div>
        <button
          onClick={() => {
            setSelectedTab("Payment");
          }}
          className="btn btn-primary"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ShippingView;
