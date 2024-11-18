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
import OrderDetail from "../pages/admin/order/detail";
import Voucher from "../pages/admin/voucher";
import ShippingAddress from "../pages/profile/address";
import Cart from "../pages/cart";
import Category from "../pages/admin/category";
import Man from "../pages/home/man";
import Women from "../pages/home/women";
import Kid from "../pages/home/kid";
import Unisex from "../pages/home/unisex";
import Profile from "../pages/profile/profile";
import UserOrder from "../pages/profile/order";
import Customer from "../pages/admin/user";
import Contact from "../pages/contact";
import About from "../pages/about";
import AllProduct from "../pages/home/product";

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
    path: "/all-product",
    component: AllProduct,
    layout: UserLayout,
  },
  {
    path: "/all-product/:search",
    component: AllProduct,
    layout: UserLayout,
  },
  {
    path: "/man-product",
    component: Man,
    layout: UserLayout,
  },
  {
    path: "/women-product",
    component: Women,
    layout: UserLayout,
  },
  {
    path: "/kids-product",
    component: Kid,
    layout: UserLayout,
  },
  {
    path: "/unisex-product",
    component: Unisex,
    layout: UserLayout,
  },
  {
    path: "/product-detail/:id",
    component: ProductDetail,
    layout: UserLayout,
  },
  {
    path: "/cart",
    component: Cart,
    layout: UserLayout,
  },
  {
    path: "/checkout",
    component: Checkout,
    layout: UserLayout,
  },
  {
    path: "/checkout/:id",
    component: CheckoutProduct,
    layout: UserLayout,
  },
  {
    path: "/profile",
    component: Profile,
    layout: UserLayout,
  },
  {
    path: "/shipping-address",
    component: ShippingAddress,
    layout: UserLayout,
  },
  {
    path: "/contact",
    component: Contact,
    layout: UserLayout,
  },
  {
    path: "/about",
    component: About,
    layout: UserLayout,
  },
  {
    path: "/orders",
    component: UserOrder,
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
  },
  {
    path: "/admin/order/:id",
    component: OrderDetail,
    layout: AdminLayout,
  },
  {
    path: "/admin/vouchers",
    component: Voucher,
    layout: AdminLayout,
  },
  {
    path: "/admin/categories",
    component: Category,
    layout: AdminLayout,
  },
  {
    path: "/admin/customers",
    component: Customer,
    layout: AdminLayout,
  },
];

export default routes;
