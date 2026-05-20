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
  lazy(() => import("../components/About.jsx")),
  <UserInfoPageSkeleton/>,
);

export const AllOrders = Loadable(
  lazy(() => import("../components/AllOrders.jsx")),
  <Loader />,
);

export const Cart = Loadable(
  lazy(() => import("../components/Cart.jsx")),
  <Loader />
);

export const Collection = Loadable(
  lazy(() => import("../components/Collection.jsx")),
  <CollectionSkeleton />
);

export const Contact = Loadable(
  lazy(() => import("../components/Contact.jsx")),
  <UserInfoPageSkeleton />
);

export const ProductInfo = Loadable(
  lazy(() => import("../components/ProductInfo.jsx")),
  <ProductDetailsSkeleton />
);

export const Profile = Loadable(
  lazy(() => import("../components/Profile.jsx")),
  <Loader />,
);

export const Checkout = Loadable(
  lazy(() => import("../components/Checkout.jsx")),
  <Loader />,
);

export const Wishlist = Loadable(
  lazy(() => import("../components/Wishlist.jsx")),
  <Loader />,
);

export const AdminUsersInfo = Loadable(
  lazy(() => import("../components/AdminUsersInfo.jsx")),
  <AdminSectionSkeleton />,
);

export const AdminProductInfo = Loadable(
  lazy(() => import("../components/AdminProductsInfo.jsx")),
  <AdminSectionSkeleton />,
);

export const AdminOrderInfo = Loadable(
  lazy(() => import("../components/AdminOrderInfo.jsx")),
  <AdminSectionSkeleton />,
);

export const AdminAddProduct = Loadable(
  lazy(() => import("../components/AdminAddProduct.jsx")),
  <Loader />,
);

export const AdminEditProduct = Loadable(
  lazy(() => import("../components/AdminEditProduct.jsx")),
  <Loader />,
);
