import { NavbarTitle } from "../../components/Navbar";
import usePanicLogout from "../../hooks/usePanicLogout";

const ErrorPage = () => {
  const { redirectCounter } = usePanicLogout();

  return (
    <div className="container flex-col gap-1 p-3 mt-20 mx-auto flex justify-center items-center">
      <NavbarTitle small={true} />
      <NavbarTitle small={false} />
      <div className="pfont md:text-2xl sm:mt-3 text-neutral-800 tracking-wide max-w-xs text-center font-bold text-xl">
        Something went wrong with your account!
      </div>
      <img
        className="w-1/5 my-3"
        src="https://static.vecteezy.com/system/resources/previews/001/199/913/non_2x/emoji-dog-face-sad-png.png"
        alt="sad"
      />
      <p className="pfont max-w-xs text-center text-neutral-600">
        It will be required to sign in again.
      </p>
      <p className="pfont italic max-w-xs text-center text-neutral-600">
        Redirected in{" "}
        <span className="text-blue-500">{redirectCounter} seconds</span>
      </p>
    </div>
  );
};

export default ErrorPage;
