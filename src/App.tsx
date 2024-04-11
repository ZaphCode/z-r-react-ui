import Routes from "./Routes";
import Debug from "./components/Debug";
import Navbar from "./components/Navbar";
import useInitAuth from "./hooks/useInitAuth";

function App() {
  const { loading } = useInitAuth();

  if (loading) return <div>loading</div>;

  return (
    <>
      <Debug />
      <Routes />
    </>
  );
}

export default App;
