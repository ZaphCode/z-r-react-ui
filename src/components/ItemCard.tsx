import { FC } from "react";
import { Product } from "../models";
import { useNavigate } from "react-router-dom";
import { formatPrice, getDiscountPrice } from "../utils/functions";

interface Props {
  product: Product;
}

const ItemCard: FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer hover:-translate-y-2 transition-all duration-500 ease-out"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="bg-gray-200 w-52 h-56">
        <img src={product.images_url[0]} alt="main image" />
      </div>
      <div className="py-5 bg-gray-50 shadow-xl shadow-gray-300 border-gray-200 pl-4">
        <p className="pfont font-bold text-xs truncate w-44 overflow-clip">
          {product.name}
        </p>
        {product.discount_rate !== 0 ? (
          <p>
            {formatPrice(getDiscountPrice(product)) + " "}
            <i className="font-normal line-through text-gray-400">
              {formatPrice(product.price)}
            </i>
          </p>
        ) : (
          <p>{formatPrice(product.price)}</p>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
