import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import DepotList from "@/pages/DepotList";
import About from "@/pages/About";
import Login from "@/pages/auth/Login";
import RegisterUser from "@/pages/auth/RegisterUser";
import LoginUser from "@/pages/auth/LoginUser";
import DepotDetail from "@/pages/DepotDetail";
import Dashboard from "@/pages/seller/Dashboard";
import Profile from "@/pages/user-profile/Profile";
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
import Address from "@/pages/user-profile/Address";
import ChangePassword from "@/pages/user-profile/ChangePassword";
import UserTransaction from "@/pages/user-profile/UserTransaction";
import ProductDetail from "@/pages/ProductDetail";
import LoginSeller from "@/pages/auth/LoginSeller";
import Register from "@/pages/auth/Register";
import RegisterSeller from "@/pages/auth/RegisterSeller";
import Search from "@/pages/Search";

const App = () => {
  const location = useLocation();

  const hideNavbarPaths = [
    "/seller",
    "/login",
    "/register",
    "/user-profile",
    "/forgot-password",
  ];

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
        <Route path="/search/:productName" Component={Search} />
        <Route path="/login" Component={Login} />
        <Route path="/profile" Component={Profile} />
        <Route path="/register" Component={Register} />
        <Route path="/register-seller" Component={RegisterSeller} />
        <Route path="/register-user" Component={RegisterUser} />
        <Route path="/login-user" Component={LoginUser} />
        <Route path="/login-seller" Component={LoginSeller} />
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
          path="/user-profile/profile"
          Component={() => <Layout children={<Profile />} />}
        />
        <Route
          path="/user-profile/Address"
          Component={() => <Layout children={<Address />} />}
        />
        <Route
          path="/user-profile/transaction"
          Component={() => <Layout children={<UserTransaction />} />}
        />
        <Route
          path="/user-profile/change-password"
          Component={() => <Layout children={<ChangePassword />} />}
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
