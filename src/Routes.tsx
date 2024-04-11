import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import AuthReq from "./components/AuthReq";
import Product from "./pages/Product";
import ErrorPage from "./pages/Account/ErrorPage";
import Cart from "./pages/Cart";
import { BaseLayout } from "./components/icons/BaseLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <BaseLayout>
        <Home />
      </BaseLayout>
    ),
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <div>Something bad happened :(</div>,
  },
  {
    path: "/product/:productId",
    element: (
      <BaseLayout>
        <Product />
      </BaseLayout>
    ),
  },
  {
    path: "/cart",
    element: (
      <BaseLayout>
        <Cart />
      </BaseLayout>
    ),
  },
  {
    path: "/account",
    element: (
      <AuthReq>
        <BaseLayout>
          <Account />
        </BaseLayout>
      </AuthReq>
    ),
    errorElement: <ErrorPage />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
