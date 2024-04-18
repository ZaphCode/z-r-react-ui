import { useParams } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getProductByID } from "../../api/product";
import { useCartStore } from "../../stores/cart";
import { Product } from "../../models";
import { formatPrice, getDiscountPrice } from "../../utils/functions";

const ProductPage = () => {
  const { productId } = useParams();
  const addToCart = useCartStore(store => store.addToCart);
  const [prodQuantity, setProdQuantity] = useState(1);

  const {
    loading,
    data: prod,
    err,
  } = useFetch(getProductByID, productId as string);

  function handleAddToCart(prod: Product) {
    for (let i = 0; i < prodQuantity; i++) {
      addToCart(prod);
    }
    setProdQuantity(1);
  }

  const [selectedImg, setSelectedImg] = useState("");

  //* Renders

  if (loading) return <div>loading</div>;

  if (err) return <div>Error {err.message}</div>; // TODO: To improve

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 lg:px-16 xl:px-52">
        <div className="flex items-start justify-center px-5">
          <div className="flex flex-col gap-3">
            {prod.images_url.map((imgSrc, i) => (
              <div
                className="bg-gray-200 w-16 h-16"
                onClick={() => setSelectedImg(imgSrc)}
                key={i}
              >
                <img
                  src={imgSrc}
                  className="h-full w-full mix-blend-multiply object-cover"
                  alt="small photos"
                />
              </div>
            ))}
          </div>
          <div className="bg-gray-100 overflow-hidden md:h-96 w-full max-w-xs lg:max-w-sm h-80 ml-7">
            <img
              src={selectedImg == "" ? prod.images_url[0] : selectedImg}
              className="mix-blend-multiply object-cover w-full h-full"
              alt="big photo"
            />
          </div>
        </div>
        <div className="lg:pt-5 px-10 pt-6 sm:mx-20 md:mx-36 mx-auto lg:mx-0">
          <h3 className="text-2xl md:mt-2 lg:mt-0 md:text-3xlT text-neutral-900 mb-4 pfont font-bold max-w-md">
            {prod.name}
          </h3>
          <span className="px-4 py-1 pfont border-2 border-neutral-700 rounded-full text-neutral-700">
            {prod.category}
          </span>
          <p className="pfont mt-4 text-neutral-600 text-lg">
            {prod.description} + Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Totam vero eum quasi beatae aut fugiat!
          </p>
          <div className="my-3">
            <p className="text-neutral-500 pfont text-lg">Price:</p>
            {prod.discount_rate !== 0 ? (
              <p className="font-bold text-neutral-900 text-3xl">
                {formatPrice(getDiscountPrice(prod)) + " "}
                <i className="font-normal line-through text-gray-400">
                  {formatPrice(prod.price)}
                </i>
              </p>
            ) : (
              <p className="font-bold text-neutral-900 text-3xl">{formatPrice(prod.price)}</p>
            )}
          </div>
          <div className="flex items-center gap-x-2 mb-10 mt-4">
            <button
              onClick={() => setProdQuantity(prodQuantity - 1)}
              disabled={prodQuantity <= 1}
              className="bg-gray-300 w-12 disabled:opacity-50 h-12 pfont text-lg font-bold text-neutral-700"
            >
              -
            </button>
            <span className="bg-gray-300 pfont w-12 h-12 text-lg text-center my-auto flex items-center justify-center font-bold text-neutral-700">
              {prodQuantity}
            </span>
            <button
              onClick={() => setProdQuantity(prodQuantity + 1)}
              className="bg-gray-300 w-12 h-12 pfont text-lg font-bold text-neutral-700"
            >
              +
            </button>
            <button
              onClick={() => handleAddToCart(prod)}
              className="border-neutral-700 border-2 h-12 px-5 ml-5 text-neutral-700 pfont"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
