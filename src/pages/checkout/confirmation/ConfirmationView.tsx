import { useEffect } from "react";
import { useCheckoutDataStore } from "../../../stores/checkoutData";
import { useCheckoutTabsStore } from "../../../stores/checkoutTabs";
import { useAuthStore } from "../../../stores/auth";
import { useCartStore } from "../../../stores/cart";

const ConfirmationView = () => {
  const selectedAddress = useCheckoutDataStore((s) => s.selectedAddress);
  const selectedCard = useCheckoutDataStore((s) => s.selectedPaymentMethod);
  const user = useAuthStore((s) => s.user);
  const cartItems = useCartStore((s) => s.items);
  const setSelectedTab = useCheckoutTabsStore((s) => s.setSelectedTab);

  useEffect(() => {
    if (!selectedAddress) setSelectedTab("Shipping");
    if (!selectedCard) setSelectedTab("Payment");
  }, []);

  return (
    <div className="flex w-full flex-col items-center mx-auto">
      <h3 className="text-center mb-4 mt-5 pfont text-lg font-semibold">
        Confirmation
      </h3>
      <div className="bg-white text-gray-500 font-semibold text-center py-6 mb-5 p-9">
        {"✅" + " "} Almost done! verify your data, then{" "}
        <b className="text-blue-500">confirm</b> the order
      </div>

      <div className="grid w-11/12 gap-x-4 grid-cols-1 lg:grid-cols-2 gap-y-5">
        {/* Customer details */}
        <div className="bg-white p-4">
          <h4 className="pfont font-bold border-b-2 border-gray-100 pb-2">
            Customer details
          </h4>
          <p className="font-semibold mt-3">Email</p>
          <p>{user.email}</p>
          <div className="grid mt-4 gap-x-3 grid-cols-2">
            <div>
              <p className="font-semibold">Shipping Address</p>
              {selectedAddress && (
                <div>
                  <p>
                    {selectedAddress.line1} - {selectedAddress.line2}
                  </p>
                  <p>
                    {selectedAddress.city}, {selectedAddress.state}{" "}
                    {selectedAddress.postal_code}
                  </p>
                  <p>{selectedAddress.country}</p>
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold">Payment info</p>
              {selectedCard && (
                <div>
                  <p>
                    {selectedCard.name} - ({selectedCard.brand}{" "}
                    {selectedCard.last4})
                  </p>
                  <p>
                    Expires: {selectedCard.exp_month}/{selectedCard.exp_year}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Order details */}
        <div className="bg-white p-4 flex flex-col justify-between">
          <div>
            <h4 className="pfont font-bold border-b-2 mb-3 border-gray-100 pb-2">
              Order details
            </h4>
            <div className="mb-10 lg:mb-0">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="my-1">
                  <p>
                    - {product.name}{" "}
                    <span className="font-semibold">x {quantity}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold">Total</p>
            <p className="text-lg font-semibold">
              $
              {cartItems
                .reduce((acc, { product, quantity }) => {
                  return acc + product.price * quantity;
                }, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="my-7">
        <button className="border-blue-500 text-blue-500 text-lg border-2 px-8 py-1">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ConfirmationView;
