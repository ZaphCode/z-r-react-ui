import { useMemo } from "react";
import { useCartStore } from "../../stores/cart";

const Cart = () => {
  const cartItems = useCartStore(store => store.items);
  const clearCart = useCartStore(store => store.clearCart);
  const removeFromTheCart = useCartStore(store => store.removeFromTheCart);
  const addToCart = useCartStore(store => store.addToCart);
  const removeSingleItem = useCartStore(store => store.removeSingleItem);

  function getTotal(items: typeof cartItems) {
    let total: number = 0;

    for (const { product, quantity } of items) {
      let realPrice =
        product.discount_rate !== 0
          ? (
              (product.price - product.price * (product.discount_rate / 100)) /
              100
            ).toFixed(2)
          : (product.price / 100).toFixed(2);

      total += parseFloat(realPrice) * quantity;
    }

    return total;
  }

  const calculation = useMemo(() => getTotal(cartItems), [cartItems]);

  return (
    <div>
      <div className="mx-auto container flex flex-col items-center">
        <button className="bg-blue-600 p-2 text-white my-4" onClick={clearCart}>
          Clear cart
        </button>
        <div>
          {cartItems.length > 0 ? (
            cartItems.map(({ product, quantity }) => (
              <div className="flex gap-x-7">
                <p>
                  {product.name} - {quantity}
                </p>
                <button
                  className="bg-gray-400"
                  onClick={() => removeFromTheCart(product.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-400"
                  onClick={() => removeSingleItem(product.id)}
                >
                  -
                </button>
                <button
                  className="bg-gray-400"
                  onClick={() => addToCart(product)}
                >
                  +
                </button>
              </div>
            ))
          ) : (
            <div>No items to display</div>
          )}
        </div>
        <div className="py-10">Total ${calculation}</div>
      </div>
    </div>
  );
};
export default Cart;
