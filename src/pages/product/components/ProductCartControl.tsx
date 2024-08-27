import { FC, useState } from "react";
import { Product } from "../../../models";
import { useCartStore } from "../../../stores/cart";

interface Props {
  product: Product;
}
const ProductCartControl: FC<Props> = ({ product }) => {
  const [prodQuantity, setProdQuantity] = useState(1);
  const addToCart = useCartStore((store) => store.addToCart);

  function handleAddToCart(prod: Product) {
    for (let i = 0; i < prodQuantity; i++) addToCart(prod);
    setProdQuantity(1);
  }

  return (
    <div className="flex items-center mb-10 mt-4">
      <button
        onClick={() => setProdQuantity(prodQuantity - 1)}
        disabled={prodQuantity <= 1}
        className="border-2 border-gray-300 w-10 disabled:text-gray-300 h-10 pfont text-lg font-bold text-neutral-700"
      >
        -
      </button>
      <span className="border-t-2 border-b-2 border-gray-300 pfont w-12 h-10 text-lg text-center my-auto flex items-center justify-center font-bold text-neutral-700">
        {prodQuantity}
      </span>
      <button
        onClick={() => setProdQuantity(prodQuantity + 1)}
        className="border-2 border-gray-300 w-10 h-10 pfont text-lg font-bold text-neutral-700"
      >
        +
      </button>
      <button
        onClick={() => handleAddToCart(product)}
        className="border-neutral-700 underline font-bold text-xl h-12 px-5 ml-5 text-neutral-700 pfont"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCartControl;
