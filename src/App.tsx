import { Toaster } from "react-hot-toast";
import Routes from "./Routes";
import Debug from "./components/Debug";
import useInitAuth from "./hooks/useInitAuth";

function App() {
  const { loading } = useInitAuth();

  if (loading) return <div>loading</div>;

  return (
    <>
      <Debug />
      <Routes />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
