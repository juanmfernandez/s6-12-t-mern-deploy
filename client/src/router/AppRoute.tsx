import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../models/routes";
import { Roles } from "../models/roles";
import Layout from "../utils/Layout";
import RoleGuard from "./guards/RoleGuard";
import AuthGuard from "./guards/AuthGuard";
import { ToastContainer } from "react-toastify";

const renderLoader = () => <p>Loading Page</p>;
const AdminDashboard = lazy(() => import("../pages/Private/Admin/AdminDashboard/AdminDashboard"));
const Home = lazy(() => import("../pages/Home/Home"));
const LogIn = lazy(() => import("../pages/LogIn/LogIn"));
const SignUp = lazy(() => import("../pages/SignUp/SignUp"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const Products = lazy(() => import("../pages/Products/Products"));
const ProductDetail = lazy(() => import("../pages/ProductDetail/ProductDetail"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

export default function AppRoute() {
  return (
    <Suspense fallback={renderLoader()}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path={PublicRoutes.PRODUCTS} element={<Products />} />
            <Route path={PublicRoutes.PRODUCTDETAIL} element={<ProductDetail />} />
            <Route element={<AuthGuard privateValidation={true} />}>
              <Route path={PublicRoutes.LOGIN} element={<LogIn />} />
              <Route path={PublicRoutes.SIGNUP} element={<SignUp />} />
            </Route>
            <Route element={<RoleGuard rol={Roles.USER} />}>
              <Route path={PrivateRoutes.PROFILE} element={<Profile />} />
            </Route>
            <Route element={<RoleGuard rol={Roles.ADMIN} />}>
              <Route path={`${PrivateRoutes.ADMIN}/*`} element={<AdminDashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <ToastContainer />
    </Suspense>
  );
}
