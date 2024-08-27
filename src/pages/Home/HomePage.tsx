import ItemCard from "../../components/ItemCard";
import SearchBar from "./components/SearchBar";
import { getAllProducts } from "../../api/product";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner";

const Home = () => {
  const { loading, data: prods } = useFetch(getAllProducts, {});

  return (
    <main>
      <div className="flex text-center sm:gap-4 gap-2 flex-col pt-5 items-center w-full h-56">
        <h2 className="pfont font-bold sm:text-4xl text-neutral-800 text-2xl tracking-wide">
          Find your dream item!
        </h2>
        <p className="text-neutral-600 max-w-sm pfont">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam,
          consequatur.
        </p>
        <SearchBar />
      </div>
      <div className="flex pt-6 container gap-x-7 mx-auto justify-center">
        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          prods &&
          prods.map((prod) => <ItemCard key={prod.id} product={prod} />)
        )}
      </div>
    </main>
  );
};

export default Home;
