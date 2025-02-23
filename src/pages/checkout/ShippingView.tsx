import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { getAuthUserAddresses } from "../../../api/addresses";
import { useCheckoutTabsStore } from "../../../stores/checkoutTabs";
import Spinner from "../../../components/ui/Spinner";
import { useCheckoutDataStore } from "../../../stores/checkoutData";
import toast from "react-hot-toast";

const ShippingView = () => {
  const { data, loading, err, refetch } = useFetch(getAuthUserAddresses, {});
  const setSelectedTab = useCheckoutTabsStore((store) => store.setSelectedTab);
  const setSelectedAddress = useCheckoutDataStore((s) => s.setSelectAddress);
  const selectedAddress = useCheckoutDataStore((s) => s.selectedAddress);

  useEffect(() => {
    if (err) {
      const timer = setTimeout(() => refetch(), 500);
      return () => clearTimeout(timer);
    }
  }, []);

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
      <div className=" w-3/5">
        {loading && (
          <div>
            <Spinner />
          </div>
        )}
        {data && data.length > 0 ? (
          <div className="flex flex-col gap-y-5 shadow-xl shadow-gray-200 ">
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
          <div className="text-gray-600 text-center">no cards saved</div>
        )}
      </div>
      <div>
        <button
          onClick={() => {
            if (!selectedAddress)
              return toast.error("Please select an address");
            setSelectedTab("Payment");
          }}
          className="my-3 border-2 border-neutral-600 text-neutral-600 px-10 py-2"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ShippingView;
