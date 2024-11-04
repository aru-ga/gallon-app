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
import Transaction from "./pages/seller/Transaction";
import Profile from "./pages/seller/Profile";
import Order from "./pages/seller/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "/seller/dashboard",
    element: <Dashboard />,
    errorElement: <NotFound />,
  },
  {
    path: "/seller/profile",
    element: <Profile />,
    errorElement: <NotFound />,
  },
  {
    path: "/seller/transaction",
    element: <Transaction />,
    errorElement: <NotFound />,
  },
  {
    path: "/seller/order",
    element: <Order />,
    errorElement: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
