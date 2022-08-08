import React from "react";
import SearchProduct from "./menues/SearchProduct/App";
import ProductDetails from "./menues/ProductDetails/App";
import Products from "./menues/Products/Products";
import CreateProduct from "./menues/Create Product/App";
import Dashboard from './menues/Dashboard/Dashboard';
import AddProduct from './menues/Add-Product/Course';
import Mailbox from './menues/Mailbox/Mailbox';
import Accesrole from './menues/Access-Role/AccessRole';

const adminRoutes = [
  {
    path: "/admin/search_product",
    exact: true,
    body: () => <SearchProduct />,
  },
  {
    path: "/admin/product_details",
    exact: true,
    body: () => <ProductDetails />,
  },
  {
    path: "/admin/products",
    exact: true,
    body: () => <Products />,
  },

  {
    path: "/admin/createproduct",
    exact: true,
    body: () => <CreateProduct />,
  },
  {
    path: '/admin/dashboard',
    exact: true,
    body: () => <Dashboard />,
  },
  {
    path: '/admin/add-product',
    exact: true,
    body: () => <AddProduct />,
  },
  {
    path: '/admin/mailbox',
    exact: true,
    body: () => <Mailbox />,
  },
  {
    path: '/admin/access-role',
    exact: true,
    body: () => <Accesrole />,
  },
];
export default adminRoutes;
