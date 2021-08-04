import React from "react";
import SearchProduct from "./menues/SearchProduct/App";
import ProductDetails from "./menues/ProductDetails/App";
import TrackedProducts from "./menues/TrackedProducts/TrackedProducts";
import CreateProduct from "./menues/Create Product/App";

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
    path: "/admin/tracked_products",
    exact: true,
    body: () => <TrackedProducts />,
  },

  {
    path: "/admin/createproduct",
    exact: true,
    body: () => <CreateProduct />,
  },
];
export default adminRoutes;
