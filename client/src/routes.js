import React from 'react'

const Home = React.lazy(() => import('./views/pages/home/Home'))
const Dashboard = React.lazy(() => import('./views/admin/dashboard/Dashboard'))
const Cart = React.lazy(()=> import ('./views/pages/cart/Cart'))
const Checkout = React.lazy(()=> import ('./views/pages/checkout/StripeContainer'))
const AddProduct = React.lazy(()=> import('./views/admin/product/addProduct/AddProduct'))
const ViewProducts = React.lazy(()=> import('./views/admin/product/viewProducts/ViewProducts'))
const ProductDetail = React.lazy(()=> import('./views/pages/product/ProductDetail'))
const AddCategory = React.lazy(() => import ('./views/admin/categories/addCategory/AddCategory'))
const ViewCategories = React.lazy(() => import('./views/admin/categories/viewCategories/ViewCategories'))
const UpdateCategory = React.lazy(()=> import('./views/admin/categories/updateCategory/UpdateCategory'))
const ViewUsers = React.lazy(()=> import ('./views/admin/users/viewUsers/ViewUsers'))
const viewCustomers = React.lazy(()=> import ('./views/admin/customers/viewCustomers/ViewCustomers'))
const Register = React.lazy(() => import('./views/pages/auth/register/Register'))
const Login = React.lazy(() => import('./views/pages/auth/login/Login'))
const Logout = React.lazy(() => import('./views/pages/auth/logout/Logout'))
const Activation = React.lazy(() => import('./views/pages/auth/register/AccountActivation'))
const ForgotPassword = React.lazy(() => import ('./views/pages/auth/forgotPassword/ForgotPassword'))
const ResetPassword = React.lazy(() => import ('./views/pages/auth/resetPassword/ResetPassword'))
const Profile = React.lazy(() => import('./views/pages/profile/Profile'))
const EditProfile = React.lazy(()=> import('./views/pages/profile/EditProfile'))
const Page404 = React.lazy(() => import('./views/pages/otherPages/page404/Page404'))

// Base
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/register', exact: true, name: 'Register', element: Register },
  { path: '/login', exact: true, name: 'Login', element: Login },
  { path: '/logout', exact: true, name: 'Logout', element: Logout },
  { path: '/accountActivation/:code', exact: true, name: 'AccountActivation', element: Activation },
  { path: '/forgotPassword', exact: true, name: 'ForgotPassword', element: ForgotPassword },
  { path: '/resetPassword/:token', exact: true, name: 'ResetPassword', element: ResetPassword },
  { path: '/user/profile', exact: true, name: 'Profile', element: Profile },
  { path: '/user/editProfile/:id', exact: true, name: 'EditProfile', element: EditProfile },
  { path: '/home', exact: true, name: 'Home', element: Home },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/viewUsers', name: 'ViewUsers', element: ViewUsers },
  { path: '/viewCustomers', name: 'ViewCustomers', element: viewCustomers },
  { path: '/viewProducts', name: 'ViewProducts', element: ViewProducts },
  { path: '/createProduct', name: 'AddProduct', element: AddProduct },
  { path: '/productDetail', name: 'ProductDetail', element: ProductDetail },
  { path: '/viewCategories', name: 'ViewCategories', element: ViewCategories },
  { path: '/createCategory', name: 'AddCategory', element: AddCategory },
  { path: '/updateCategory/:id', name: 'UpdateCategory', element: UpdateCategory },
  { path: '/cart', name: 'Cart', element: Cart },
  { path: '/checkout', name: 'Chekout', element: Checkout },
  { path: '*', name: 'Page404', element: Page404 },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
