import { useMemo } from "react";
import { useCartStore } from "../../stores/cart";
import { getTotal } from "../../utils/functions";
import { useCheckoutTabsStore } from "../../stores/checkoutTabs";
import ProductInCart from "../../components/ProductInCart";

const CartOverviewView = () => {
  const cartItems = useCartStore((store) => store.items);
  const calculation = useMemo(() => getTotal(cartItems), [cartItems]);
  const setSelectedTab = useCheckoutTabsStore((store) => store.setSelectedTab);

  return (
    <div>
      <h3 className="pfont text-center font-semibold mt-3 mb-6">
        Cart Overview
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10">
        <div className="flex flex-col items-center">
          {cartItems.length > 0 ? (
            <div className="flex flex-col gap-y-5">
              {cartItems.map((cartItem) => (
                <div
                  key={cartItem.product.id}
                  className="bg-white max-w-md px-2 pt-2 pb-5 shadow-lg shadow-neutral-200"
                >
                  <ProductInCart cardItem={cartItem} />
                </div>
              ))}
            </div>
          ) : (
            <p className="pfont">
              Your cart is empty. Go to home page and check the newest products,
              or search your favorite products here.
            </p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-white p-5 w-full">
            <div className="flex w-full justify-between">
              <h5 className="text-xl">Subtotal:</h5>
              <p className="text-lg font-semibold">${calculation}</p>
            </div>
            <div className="my-1 pb-3 border-b-2 border-gray-300">
              <button className="bg-gray-200 text-xs text-gray-500 px-3 py-1">
                add promocode
              </button>
            </div>
            <div className="flex w-full justify-between">
              <h5 className="text-2xl">Total:</h5>
              <p className="text-lg underline font-bold">${calculation}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedTab("Shipping");
            }}
            className="my-6 border-2 border-neutral-700 px-10 py-2"
          >
            Go to Shipping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartOverviewView;
