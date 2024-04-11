import { FC } from "react";
import { Product } from "../models";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
}

const ItemCard: FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="bg-gray-300 w-52 h-60">
        <img src={product.images_url[0]} alt="main image" />
      </div>
      <div className="py-5">
        <p className="pfont font-bold text-xs">{product.name}</p>
        {product.discount_rate !== 0 ? (
          <p>
            $
            {(product.price - product.price * (product.discount_rate / 100)) /
              100}{" "}
            <i className="font-normal line-through text-gray-600">
              ${product.price / 100}
            </i>
          </p>
        ) : (
          <p>${product.price / 100}</p>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
