import { FC, useMemo } from "react";
import { useCartStore } from "../../stores/cart";
import { NavbarTitle } from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import ProductInCart from "../../components/ProductInCart";
import { getTotal } from "../../utils/functions";

interface Props {
  closeFn: () => void;
}

const Cart: FC<Props> = ({ closeFn }) => {
  const cartItems = useCartStore((store) => store.items);
  const clearCart = useCartStore((store) => store.clearCart);
  const calculation = useMemo(() => getTotal(cartItems), [cartItems]);
  const navigate = useNavigate();

  return (
    <div className="mt-1">
      <div className="flex justify-center pt-5 mb-2">
        <NavbarTitle small={false} disabled={true} />
      </div>
      <div className=" w-4/5 mx-auto max-w-xl">
        <div className="flex justify-between py-1 mb-3">
          <h3 className="pfont text-lg font-semibold">Shopping Cart</h3>
          {cartItems.length > 0 && (
            <button onClick={clearCart} className="underline text-lg">
              clear
            </button>
          )}
        </div>
        <div>
          {cartItems.length > 0 ? (
            <div className="flex flex-col gap-y-8">
              {cartItems.map((cartItem) => (
                <ProductInCart key={cartItem.product.id} cardItem={cartItem} />
              ))}
              <div className="border-t-2 mt-2 border-gray-200">
                <div className="flex justify-between  p-2">
                  <p className="pfont text-lg">Total</p>
                  <p className="pfont font-bold text-xl">${calculation}</p>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      closeFn();
                      navigate("/checkout");
                    }}
                    className="border-neutral-700 border-2 h-9 px-4 text-neutral-700 pfont"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="pfont">
              Your cart is empty. Go to home page and check the newest products,
              or search your favorite products here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Cart;
