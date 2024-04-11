import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/auth";
import { signoutAPICall } from "../api/auth";
// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function usePanicLogout() {
  const signout = useAuthStore(store => store.signout);
  const navigate = useNavigate();

  async function redirectFn() {
    const [_, err] = await signoutAPICall();

    if (err) console.log("Error", err.message);

    signout();

    navigate("/");
  }

  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      } else {
        clearInterval(interval);
        redirectFn();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  return { redirectCounter: count };
}

export default usePanicLogout;
