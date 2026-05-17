import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './styles/global.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import store from './store/index.js';
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
import ForgotPasswordPage from './pages/forgot-password.jsx';
import ResetPasswordPage from './pages/reset-password.jsx';
import ProductDetail from './pages/product-detail.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import InventoryPage from './pages/inventory.jsx';
import CartPage from './pages/cart.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'user', element: <UserPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: 'product/:slug', element: <ProductDetail /> },
      { path: 'inventory', element: <InventoryPage /> },
      { path: 'cart', element: <CartPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthWrapper>
        <RouterProvider router={router} />
      </AuthWrapper>
    </Provider>
  </React.StrictMode>
);
