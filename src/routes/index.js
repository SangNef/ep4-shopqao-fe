import React from "react";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/admin/dashboard";
import Product from "../pages/admin/product";
import Login from "../pages/auth/login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/auth/register";
import Home from "../pages/home";
import UserLayout from "../layouts/UserLayout";
import CheckoutProduct from "../pages/checkout/product";
import ProductDetail from "../pages/product/detail";
import Checkout from "../pages/checkout/checkout";
import Order from "../pages/admin/order";

const routes = [
  {
    path: "/login",
    component: Login,
    layout: AuthLayout,
  },
  {
    path: "/register",
    component: Register,
    layout: AuthLayout,
  },
  {
    path: "/",
    component: Home,
    layout: UserLayout,
  },
  {
    path: "/product-detail/:id",
    component: ProductDetail,
    layout: UserLayout,
  },
  {
    path: "/checkout",
    component: Checkout,
    layout: UserLayout,
  },
  {
    path: "/admin",
    component: Dashboard,
    layout: AdminLayout,
  },
  {
    path: "/admin/products",
    component: Product,
    layout: AdminLayout,
  },
  {
    path: "/admin/orders",
    component: Order,
    layout: AdminLayout,
  }
];

export default routes;
