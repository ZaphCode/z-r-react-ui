import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getProductByID } from "../../api/product";
import { formatPrice, getDiscountPrice } from "../../utils/functions";
import { TagIcon } from "../../components/icons";
import ProductCartControl from "./components/ProductCartControl";
import { ProductImageDisplay } from "./components/ProductImageDisplay";

const ProductPage = () => {
  const { productId } = useParams();

  const {
    loading,
    data: prod,
    err,
  } = useFetch(getProductByID, productId as string);

  if (loading) return <div>loading</div>;

  if (err) return <div>Error {err.message}</div>; // TODO: To improve

  if (prod)
    return (
      <div className="mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 lg:px-16 xl:px-52">
          <ProductImageDisplay product={prod} />
          <section className="lg:pt-5 px-10 pt-10 sm:mx-20 md:mx-36 mx-auto lg:mx-0">
            <h3 className="text-2xl md:mt-2 lg:mt-0 md:text-3xlT text-neutral-900 mb-2 pfont font-bold max-w-md">
              {prod.name}
            </h3>
            <div className="px-4 -ml-3 flex gap-x-1 py-1 pfont text-neutral-700">
              <TagIcon />
              <span className="font-semibold">{prod.category}</span>
            </div>
            <p className="pfont mt-2 text-neutral-600 text-lg">
              {prod.description} + Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Totam vero eum quasi beatae aut fugiat!
            </p>
            <div className="my-3">
              <p className="text-neutral-500 pfont text-lg">Price:</p>
              {prod.discount_rate !== 0 ? (
                <em className="font-bold text-neutral-900 text-3xl">
                  {formatPrice(getDiscountPrice(prod)) + " "}
                  <i className="font-normal line-through text-gray-400">
                    {formatPrice(prod.price)}
                  </i>
                </em>
              ) : (
                <em className="font-bold text-neutral-900 text-3xl">
                  {formatPrice(prod.price)}
                </em>
              )}
            </div>
            <ProductCartControl product={prod} />
          </section>
        </div>
      </div>
    );
};

export default ProductPage;
