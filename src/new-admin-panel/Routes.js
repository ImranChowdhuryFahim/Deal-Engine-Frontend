import React from 'react';
import SearchProduct from './menues/SearchProduct/App';
import ProductDetails from './menues/ProductDetails/App';
import Mailbox from './menues/Mailbox/Mailbox';
import Accesrole from './menues/Access-Role/AccessRole';

const adminRoutes = [
  {
    path: '/admin/search_product',
    exact: true,
    body: () => <SearchProduct/>,
  },
  {
    path: '/admin/product_details',
    exact: true,
    body: () => <ProductDetails />,
  },
  {
    path: '/admin/tracked_products',
    exact: true,
    body: () => <Accesrole />,
  },

  {
    path: '/admin/mailbox',
    exact: true,
    body: () => <Mailbox />,
  },
];
export default adminRoutes;
