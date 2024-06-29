import { Link, useNavigate } from "react-router-dom";
import BagIcon from "./icons/BagIcon";
import BurgerIcon from "./icons/BurgerIcon";
import SearchIcon from "./icons/SearchIcon";
import { useAuthStore } from "../stores/auth";
import { useCartStore } from "../stores/cart";
import { useEffect, useState } from "react";
import useModal from "../hooks/useModal";
import SidePanel from "./SidePanel";
import CardUI from "../pages/cart/CartView";

const Navbar = () => {
  const authenticated = useAuthStore((store) => store.authenticated);
  const initialCount = useCartStore((store) => store.items.length);
  const [prodsInCartCounter, setProdsInCartCounter] = useState(initialCount);
  const [isSPOpen, openSP, closeSP] = useModal();

  useEffect(() => {
    const unSubFn = useCartStore.subscribe((state, _) => {
      setProdsInCartCounter(state.items.length);
    });

    return unSubFn;
  }, []);

  return (
    <div className="py-3  grid px-2 grid-cols-2 xl:mx-20 lg:mx-16 md:py-6 md:mx-9 sm:grid-cols-3 mx-2 sm:mx-4">
      <div className="col-span-1 flex items-center">
        <div className="bg-neutral-950 shadow-md shadow-gray-700 cursor-pointer flex justify-center items-center h-8 md:h-10 md:w-10 rounded-full w-8">
          <BurgerIcon />
        </div>
        <div className="flex cursor-pointer items-center w-5 md:mx-8 lg:mx-12 md:h-7 md:w-7 ml-2 h-5">
          <SearchIcon />
        </div>
        <NavbarTitle small={true} />
      </div>
      <div className="hidden sm:flex items-center justify-center col-span-1">
        <NavbarTitle small={false} />
      </div>
      <div className="flex justify-end items-center">
        <div>
          <Link
            to={"/account"}
            className={`md:mx-8 ${
              authenticated
                ? "text-neutral-600 underline font-semibold"
                : "text-neutral-950"
            } cursor-pointer lg:mx-12 uppercase text-sm tracking-widest font-semibold pfont mx-2`}
          >
            account
          </Link>
        </div>
        <div>
          <button onClick={() => openSP()}>
            <BagIcon />
            {prodsInCartCounter > 0 && (
              <span className="bg-neutral-900 rounded-full text-gray-100 absolute flex items-center justify-center text-xs md:top-12 top-8 w-4 h-4">
                {prodsInCartCounter}
              </span>
            )}
          </button>
        </div>
      </div>
      <SidePanel side="right" isOpen={isSPOpen} closeFn={closeSP}>
        <div className="w-[520px]">
          <CardUI closeFn={closeSP} />
        </div>
      </SidePanel>
    </div>
  );
};

export const NavbarTitle = ({
  small,
  disabled = false,
}: {
  small: boolean;
  disabled?: boolean;
}) => {
  const className = small ? "sm:hidden ml-2" : "hidden sm:block";
  const router = useNavigate();
  return (
    <button disabled={disabled} onClick={() => router("/")}>
      <h1
        className={
          "main-title bounce relative text-neutral-900 font-bold text-lg sm:text-3xl md:text-4xl ml-3 " +
          className
        }
      >
        Z&R
        <span className="absolute h-1 w-1 sm:h-2 sm:w-2 shadow-md shadow-neutral-800 bg-neutral-400 rounded-full -right-0.5 sm:-right-1.5 top-1 sm:top-0.5"></span>
        <span className="absolute h-1 w-1 shadow sm:h-2 sm:w-2 -md shadow-neutral-800 bg-zinc-700 rounded-full -left-0 bottom-1.5 sm:bottom-2"></span>
      </h1>
    </button>
  );
};

export default Navbar;
