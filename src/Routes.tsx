import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "./components/icons/BaseLayout";
import Home from "./pages/HomePage";
import Auth from "./pages/AuthPage";
import Account from "./pages/account/AccountPage";
import AuthReq from "./components/AuthReq";
import Product from "./pages/ProductPage";
import ErrorPage from "./pages/ErrorPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";

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
    path: "/checkout",
    element: (
      <AuthReq>
        <CheckoutPage />
      </AuthReq>
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
