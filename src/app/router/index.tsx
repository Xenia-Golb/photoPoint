import { createBrowserRouter, Navigate, useRoutes } from "react-router-dom";
import { HomePage } from "../../pages";
import { CartPage } from "../../pages";
import { ErrorPage } from "../../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export function Router() {
  return useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/cart", element: <CartPage /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
}
