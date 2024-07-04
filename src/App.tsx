import { Toaster } from "react-hot-toast";
import Routes from "./Routes";
import Debug from "./components/Debug";
import useInitAuth from "./hooks/useInitAuth";
import Spinner from "./components/Spinner";

function App() {
  const { loading } = useInitAuth();

  if (loading) {
      return (
          <div className="flex  h-full pt-48 w-full justify-center items-center">
              <Spinner />
          </div>
      );
  }


  return (
    <>
      <Debug />
      <Routes />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
