import React from 'react'
//import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCartShopping,
  faUserAlt,
  faUsers,
  faLock,
  faPager,
  faTruck,
  faLayerGroup,
  faBagShopping,
  faDashboard,
  faFileInvoice,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <FontAwesomeIcon icon={faDashboard} className="me-3" />,
  },
  //Products Menu
  {
    component: CNavGroup,
    name: 'Products',
    icon: <FontAwesomeIcon icon={faBagShopping} className="me-3" />,
    items: [
      {
        component: CNavItem,
        name: 'viewProducts',
        to: '/admin/viewProducts',
      },
      {
        component: CNavItem,
        name: 'Add Product',
        to: '/admin/createProduct',
      },
    ],
  },
  //Categories Menu
  {
    component: CNavGroup,
    name: 'Categories',
    icon: <FontAwesomeIcon icon={faLayerGroup} className="me-3" />,
    items: [
      {
        component: CNavItem,
        name: 'Category List',
        to: '/admin/viewCategories',
      },
      {
        component: CNavItem,
        name: 'Add Category',
        to: '/admin/createCategory',
      },
    ],
  },
  // CART
  {
    component: CNavGroup,
    name: 'Cart',
    icon: <FontAwesomeIcon icon={faCartShopping} className="me-3" />,
    items: [
      {
        component: CNavItem,
        name: 'Cart List',
        to: '/admin/carts',
      },
    ],
  },
  //Orders
  {
    component: CNavGroup,
    name: 'Orders',
    icon: <FontAwesomeIcon icon={faTruck} className="me-3" />,
    items: [
      {
        component: CNavItem,
        name: 'Order List',
        to: '/admin/orders',
      },
      {
        component: CNavItem,
        name: 'Order Detail',
        to: '/orders/order-detail',
      },
      {
        component: CNavItem,
        name: 'Checkout',
        to: '/checkout',
        icon: <FontAwesomeIcon icon={faIdCard} className="me-3" />,
      },
      {
        component: CNavItem,
        name: 'Order Invoices',
        to: '/admin/orders/invoices',
        icon: <FontAwesomeIcon icon={faFileInvoice} className="me-3" />,
      },
    ],
  },
  //Customers
  {
    component: CNavGroup,
    name: 'Customers',
    icon: <FontAwesomeIcon icon={faUserAlt} className="me-3" />,
    items: [
      {
        component: CNavItem,
        name: 'Customer List',
        to: '/admin/customers',
      },
      {
        component: CNavItem,
        name: 'Customer Detail',
        to: '/admin/customers/customer-detail/:id',
      },
    ],
  },
  //Users
  {
    component: CNavGroup,
    name: 'Users',
    icon: <FontAwesomeIcon icon={faUsers} className="me-3" />,
    items: [
      {
        component: CNavItem,
        name: 'User List',
        to: '/admin/users',
      },
      {
        component: CNavItem,
        name: 'Add User',
        to: '/admin/addUser',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Pages',
  },
  {
    component: CNavGroup,
    name: 'Authentication',
    icon: <FontAwesomeIcon icon={faLock} className="me-3" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Fogot Password',
        to: '/forgot-password',
      },
      {
        component: CNavItem,
        name: 'Reset password',
        to: '/reset-password',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Other Pages',
    icon: <FontAwesomeIcon icon={faPager} className="me-3" />,
    items: [
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
]

export default _nav
