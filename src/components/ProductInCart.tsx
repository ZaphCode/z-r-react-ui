import { FC } from "react";
import { CartItem, useCartStore } from "../stores/cart";
import { formatPrice, getDiscountPrice } from "../utils/functions";
import CloseIcon from "./icons/CloseIcon";

interface Props {
  cardItem: CartItem;
}

const ProductInCart: FC<Props> = ({ cardItem: { product, quantity } }) => {
  const removeFromCart = useCartStore((store) => store.removeFromTheCart);
  const addToCart = useCartStore((store) => store.addToCart);
  const removeSingleItem = useCartStore((store) => store.removeSingleItem);

  return (
    <article key={product.id} className="flex justify-between">
      <figure className="w-1/5">
        <img
          src={product.images_url[0]}
          className="w-full h-20 object-cover"
          alt="product image"
        />
      </figure>
      <div className="flex w-4/5 pl-3 pt-3">
        <div className=" w-2/3">
          <h4 className="truncate text-lg">{product.name}</h4>
          <p className="truncate text-sm mb-1">{product.description}</p>
          <div className="flex text-neutral-600 font-semibold items-baseline">
            <button
              onClick={() => removeSingleItem(product.id)}
              className="h-7 w-7  transition ease-in border-2 flex items-center justify-center border-gray-200"
            >
              -
            </button>
            <span className="h-7 w-8 transition ease-in border-t-2 border-b-2 flex items-center justify-center border-gray-200">
              {quantity}
            </span>
            <button
              onClick={() => addToCart(product)}
              className="h-7 w-7  transition ease-in border-2 flex items-center justify-center border-gray-200"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex w-1/3 gap-y-1 pt-1 items-end justify-between px-1 flex-col">
          <button
            onClick={() => removeFromCart(product.id)}
            className="rounded-full text-gray-800 font-bold hover:text-gray-400"
          >
            <CloseIcon />
          </button>
          <span className="text-xl font-semibold pr-1">
            {product.discount_rate !== 0
              ? formatPrice(getDiscountPrice(product) * quantity)
              : formatPrice(product.price * quantity)}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductInCart;
