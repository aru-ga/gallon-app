import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import DepotList from "./pages/DepotList";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import LoginUser from "./pages/auth/LoginUser";
import DepotDetail from "./pages/DepotDetail";
import Dashboard from "./pages/seller/Dashboard";
import Profile from "./pages/Profile";
import SellerTransaction from "./pages/seller/SellerTransaction";
import SellerProfile from "./pages/seller/SellerProfile";
import Order from "./pages/seller/Order";
import Cart from "./pages/Cart";
import Layout from "./pages/seller/Layout";
import CatalogueEdit from "./pages/seller/CatalogueEdit";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Transaction from "./pages/Transaction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/transaction",
    element: <Transaction />,
    errorElement: <NotFound />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <NotFound />,
  },
  {
    path: "/depot-list",
    element: <DepotList />,
    errorElement: <NotFound />,
  },
  {
    path: "/depot-detail/:depotId",
    element: <DepotDetail />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <NotFound />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <NotFound />,
  },
  {
    path: "/login-user",
    element: <LoginUser />,
    errorElement: <NotFound />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <NotFound />,
  },
  {
    path: "/seller/dashboard",
    element: <Layout children={<Dashboard />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/seller/dashboard/edit-catalogue",
    element: <CatalogueEdit />,
    errorElement: <NotFound />,
  },
  {
    path: "/seller/profile",
    element: <Layout children={<SellerProfile />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/seller/transaction",
    element: <Layout children={<SellerTransaction />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/seller/order",
    element: <Layout children={<Order />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
