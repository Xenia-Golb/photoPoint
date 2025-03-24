import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomePage } from "../../pages/Home";
import { CartPage } from "../../pages/Cart";
import { ErrorPage } from "../../shared/ui/ErrorPage";

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
]);

export function Router() {
  return useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/cart", element: <CartPage /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
}
