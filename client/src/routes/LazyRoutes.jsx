import { lazy } from "react";
import Loadable from "./Loadable.jsx";
import { HomeSkeleton } from "../components/skeletons/Index.jsx";

const Loader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <ClipLoader size={40} />
  </div>
);

export const About = Loadable(lazy(() => import("../components/About.jsx")), <HomeSkeleton/>);

export const AllOrders = Loadable(lazy(() => import("../components/AllOrders.jsx")));

export const Cart = Loadable(lazy(() =>import("../components/Cart.jsx")));

export const Collection = Loadable(lazy(() =>import("../components/Collection.jsx")));

export const Contact = Loadable(lazy(() =>import("../components/Contact.jsx")));

export const ProductInfo = Loadable(lazy(() =>import("../components/ProductInfo.jsx")));

export const Profile = Loadable(lazy(() =>import("../components/Profile.jsx")));

export const Checkout = Loadable(lazy(() =>import("../components/Checkout.jsx")));

export const Wishlist = Loadable(lazy(() =>import("../components/Wishlist.jsx")));

export const AdminPageLayout = Loadable(lazy(() =>import("../components/AdminPageLayout.jsx")));

export const AdminUsersInfo = Loadable(lazy(() =>import("../components/AdminUsersInfo.jsx")));

export const AdminProductInfo = Loadable(lazy(() =>import("../components/AdminProductsInfo.jsx")));

export const AdminOrderInfo = Loadable(lazy(() =>import("../components/AdminOrderInfo.jsx")));

export const AdminAddProduct = Loadable(lazy(() =>import("../components/AdminAddProduct.jsx")));

export const AdminEditProduct = Loadable(lazy(() =>import("../components/AdminEditProduct.jsx")));