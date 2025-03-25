import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../../shared/ui/Layout";
import { ErrorPage, HomePage, CartPage } from "../../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
