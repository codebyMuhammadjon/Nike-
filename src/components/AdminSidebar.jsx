import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { LayoutDashboard, Package, ShoppingBag, LogOut } from "lucide-react";
import { logout } from "../store/slices/authSlice";

function AdminSidebar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          NIKE Admin
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-grow p-6 space-y-4">
        <Link
          to="/admin"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            location.pathname === "/admin"
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </Link>

        <Link
          to="/admin/products"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isActive("/products")
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <Package size={20} />
          <span className="font-medium">{t("admin.products")}</span>
        </Link>

        <Link
          to="/admin/orders"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isActive("/orders")
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <ShoppingBag size={20} />
          <span className="font-medium">{t("admin.orders")}</span>
        </Link>
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition"
        >
          <LogOut size={20} />
          <span className="font-medium">{t("admin.logout")}</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
