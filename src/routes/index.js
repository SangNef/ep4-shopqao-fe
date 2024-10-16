import React from "react";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/dashboard";
import Product from "../pages/product";

const routes = [
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
