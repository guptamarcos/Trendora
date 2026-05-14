import { lazy } from "react";

export const About = lazy(() => import("../components/About.jsx"));

export const AllOrders = lazy(() => import("../components/Index.jsx"));

export const Cart = lazy(() =>import("../components/Cart.jsx"));

export const Collection = lazy(() =>import("../components/Collection.jsx"));

export const Contact = lazy(() =>import("../components/Contact.jsx"));

export const ProductInfo = lazy(() =>import("../components/ProductInfo.jsx"));

export const Profile = lazy(() =>import("../components/Profile.jsx"));

export const Checkout = lazy(() =>import("../components/Checkout.jsx"));

export const Wishlist = lazy(() =>import("../components/Wishlist.jsx"));

export const AdminPageLayout = lazy(() =>import("../components/AdminPageLayout.jsx"));

export const AdminUsersInfo = lazy(() =>import("../components/AdminUsersInfo.jsx"));

export const AdminProductInfo = lazy(() =>import("../components/AdminProductsInfo.jsx"));

export const AdminOrderInfo = lazy(() =>import("../components/AdminOrderInfo.jsx"));

export const AdminAddProduct = lazy(() =>import("../components/AdminAddProduct.jsx"));

export const AdminEditProduct = lazy(() =>import("../components/AdminEditProduct.jsx"));