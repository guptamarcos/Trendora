import { lazy } from "react";
import Loadable from "./Loadable.jsx";
import Loader from "../components/loaders/Loader.jsx";
import {
  HomeSkeleton,
  AdminSectionSkeleton,
  CollectionSkeleton,
  UserInfoPageSkeleton,
  ProductDetailsSkeleton,
} from "../components/skeletons/Index.jsx";    

export const About = Loadable(
  lazy(() => import("../pages/About.jsx")),
  <UserInfoPageSkeleton/>,
);

export const UserOrders = Loadable(
  lazy(() => import("../pages/UserOrders.jsx")),
  <Loader />,
);

export const Cart = Loadable(
  lazy(() => import("../pages/Cart.jsx")),
  <Loader />
);

export const Collection = Loadable(
  lazy(() => import("../pages/Collection.jsx")),
  <CollectionSkeleton />
);

export const Contact = Loadable(
  lazy(() => import("../pages/Contact.jsx")),
  <UserInfoPageSkeleton />
);

export const ProductInfo = Loadable(
  lazy(() => import("../pages/ProductInfo.jsx")),
  <ProductDetailsSkeleton />
);

export const Profile = Loadable(
  lazy(() => import("../pages/Profile.jsx")),
  <Loader />,
);

export const Checkout = Loadable(
  lazy(() => import("../pages/Checkout.jsx")),
  <Loader />,
);

export const Wishlist = Loadable(
  lazy(() => import("../pages/Wishlist.jsx")),
  <Loader />,
);

export const AdminUsersInfo = Loadable(
  lazy(() => import("../pages/admin/AdminUsersInfo.jsx")),
  <AdminSectionSkeleton />,
);

export const AdminProductInfo = Loadable(
  lazy(() => import("../pages/admin/AdminProductsInfo.jsx")),
  <AdminSectionSkeleton />,
);

export const AdminOrderInfo = Loadable(
  lazy(() => import("../pages/admin/AdminOrderInfo.jsx")),
  <AdminSectionSkeleton />,
);

export const AdminAddProduct = Loadable(
  lazy(() => import("../pages/admin/AdminAddProduct.jsx")),
  <Loader />,
);

export const AdminEditProduct = Loadable(
  lazy(() => import("../pages/admin/AdminEditProduct.jsx")),
  <Loader />,
);

export const VerifyOtpForm = Loadable(
  lazy(() => import("../pages/VerifyOtpForm.jsx")),
  <Loader />,
);
