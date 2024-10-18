import React from "react";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/dashboard";
import Product from "../pages/product";
import Login from "../pages/auth/login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/auth/register";

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
    component: Dashboard,
    layout: AdminLayout,
  },
  {
    path: "/products",
    component: Product,
    layout: AdminLayout,
  },
];

export default routes;
