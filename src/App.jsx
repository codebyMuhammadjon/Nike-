import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode } from "./store/slices/themeSlice";

// Layouts
import UserLayout from "./layout/UserLayout";
import AdminLayout from "./layout/AdminLayout";

// User Pages
import Home from "./pages/User/Home";
import ProductDetail from "./pages/User/ProductDetail";
import Cart from "./pages/User/Cart";
import Checkout from "./pages/User/Checkout";
import OrderSuccess from "./pages/User/OrderSuccess";

// Admin Pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminProducts from "./pages/Admin/AdminProducts";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  // Initialize and sync dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Protected Route Component
  const ProtectedAdminRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  };

  return (
    <Routes>
      {/* User Routes */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route path="/admin/products" element={<AdminProducts />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
