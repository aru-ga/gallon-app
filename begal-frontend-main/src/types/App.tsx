import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import DepotList from "@/pages/DepotList";
import About from "@/pages/About";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import LoginUser from "@/pages/auth/LoginUser";
import DepotDetail from "@/pages/DepotDetail";
import Dashboard from "@/pages/seller/Dashboard";
import Profile from "@/pages/Profile";
import SellerTransaction from "@/pages/seller/SellerTransaction";
import SellerProfile from "@/pages/seller/SellerProfile";
import Order from "@/pages/seller/Order";
import Cart from "@/pages/Cart";
import Layout from "@/pages/seller/Layout";
import CatalogueEdit from "@/pages/seller/CatalogueEdit";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Transaction from "@/pages/Transaction";
import Footer from "@/components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProductDetail from "@/pages/seller/ProductDetail";

const App = () => {
  const location = useLocation();

  const hideNavbarPaths = ["/seller", "/login", "/register", "/profile-user"];

  return (
    <>
      {!hideNavbarPaths.some((path) => location.pathname.startsWith(path)) && (
        <Navbar />
      )}

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/transaction" Component={Transaction} />
        <Route path="/about" Component={About} />
        <Route path="/depot-list" Component={DepotList} />
        <Route path="/depot-detail/:depotId" Component={DepotDetail} />
        <Route path="/product-detail/:productId" Component={ProductDetail} />
        <Route path="/login" Component={Login} />
        <Route path="/profile" Component={Profile} />
        <Route path="/register" Component={Register} />
        <Route path="/login-user" Component={LoginUser} />
        <Route path="/forgot-password" Component={ForgotPassword} />
        <Route
          path="/seller/dashboard"
          Component={() => <Layout children={<Dashboard />} />}
        />
        <Route
          path="/seller/dashboard/edit-catalogue"
          Component={CatalogueEdit}
        />
        <Route
          path="/seller/profile"
          Component={() => <Layout children={<SellerProfile />} />}
        />
        <Route
          path="/seller/transaction"
          Component={() => <Layout children={<SellerTransaction />} />}
        />
        <Route
          path="/seller/order"
          Component={() => <Layout children={<Order />} />}
        />
        <Route
          path="/profile-user/"
          Component={() => <Layout children={<Dashboard />} />}
        />
        <Route path="/profile-user/address" Component={CatalogueEdit} />
        <Route
          path="/profile-user/transaction"
          Component={() => <Layout children={<SellerProfile />} />}
        />
        <Route
          path="/profile-user/change-password"
          Component={() => <Layout children={<SellerTransaction />} />}
        />
        <Route path="/cart" Component={Cart} />
        <Route path="/*" Component={NotFound} />
      </Routes>

      {!hideNavbarPaths.some((path) => location.pathname.startsWith(path)) && (
        <Footer />
      )}
    </>
  );
};

export default App;
