import { lazy } from 'react';

const Auth = lazy(() => import('./pages/Auth'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const ViewUsers = lazy(() => import('./components/ViewUsers'));
const ProductsPage = lazy(() => import('./pages/products/ProductPage'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const UnauthorizedModal = lazy(() => import('./components/UnauthorizedModal'));
const Stats = lazy(() => import('./pages/Stats'));
const CategoryPage = lazy(() => import('./components/category/CategoryPage'));
const Movimientos = lazy(() => import('./pages/Movimientos'));

const routes = [
    { path: '/', element: <Auth /> },
    { path: '/unauthorized', element: <UnauthorizedModal /> },
    {
        path: '/dashboard/*',
        element: <PrivateRoute allowedRoles={['ADMIN_ROLE', 'EMPLOYEE_ROLE']} />,
        children: [
            { path: '', element: <LandingPage /> }
        ]
    },
    {
      path: '/products/*',
      element: <PrivateRoute allowedRoles={['ADMIN_ROLE', 'EMPLOYEE_ROLE']} />,
      children: [
        { path: '', element: <ProductsPage /> }
      ]
    },
    {
      path: '/users/*',
      element: <PrivateRoute allowedRoles={['ADMIN_ROLE']} />,
      children: [
        { path: '*', element: <ViewUsers /> },
        { path: ':id', element: <ViewUsers /> }
      ]
    },
    {
        path: '/category/*',
        element: <PrivateRoute allowedRoles={['ADMIN_ROLE', 'EMPLOYEE_ROLE']} />,
        children: [
            { path: '', element: <CategoryPage /> }
        ]
    },
    {
      path: '/movimientos/*',
      element: <PrivateRoute allowedRoles={['ADMIN_ROLE', 'EMPLOYEE_ROLE']} />,
      children: [
        { path: '', element: <Movimientos /> }
      ]
    }
  ];

export default routes