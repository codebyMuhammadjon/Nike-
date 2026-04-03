import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Search, ShoppingCart, Heart, Menu, X, Moon, Sun } from "lucide-react";
import { toggleDarkMode } from "../store/slices/themeSlice";
import { logout } from "../store/slices/authSlice";

function Navbar() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const token = useSelector((state) => state.auth.token);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const handleAdminClick = () => {
    if (token) {
      dispatch(logout());
      navigate("/");
    } else {
      navigate("/admin/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      {/* Top Navigation */}
      <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
        <div className="flex gap-4">
          <Link to="/" className="hover:text-black dark:hover:text-white">
            Find a Store
          </Link>
          <span>|</span>
          <span>Help</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => changeLanguage("uz")}
            className={
              i18n.language === "uz"
                ? "font-bold text-black dark:text-white"
                : ""
            }
          >
            UZ
          </button>
          <button
            onClick={() => changeLanguage("ru")}
            className={
              i18n.language === "ru"
                ? "font-bold text-black dark:text-white"
                : ""
            }
          >
            RU
          </button>
          <button
            onClick={() => changeLanguage("en")}
            className={
              i18n.language === "en"
                ? "font-bold text-black dark:text-white"
                : ""
            }
          >
            EN
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <div className="text-2xl font-bold text-black dark:text-white">
            NIKE
          </div>
        </Link>

        {/* Center Menu */}
        <ul className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-800 dark:text-gray-200">
          <li>
            <Link to="/" className="hover:text-black dark:hover:text-white">
              {t("nav.home")}
            </Link>
          </li>
          <li>
            <a href="#" className="hover:text-black dark:hover:text-white">
              {t("nav.men")}
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-black dark:hover:text-white">
              {t("nav.women")}
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-black dark:hover:text-white">
              {t("nav.kids")}
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-black dark:hover:text-white">
              {t("nav.sale")}
            </a>
          </li>
        </ul>

        {/* Right Actions */}
        <div className="flex gap-4 items-center">
          {/* Search */}
          <div className="relative hidden sm:flex">
            <input
              type="text"
              placeholder={t("header.search")}
              className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full text-sm w-48 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ShoppingCart
              size={20}
              className="text-gray-800 dark:text-gray-200"
            />
            {cartItems.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Admin/Sign In */}
          <button
            onClick={handleAdminClick}
            className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100\"
          >
            {token ? t("admin.logout") : t("header.admin")}
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 dark:bg-gray-900 px-4 py-4 border-t border-gray-200 dark:border-gray-700">
          <ul className="space-y-4 text-sm">
            <li>
              <Link
                to="/"
                className="block hover:text-black dark:hover:text-white"
              >
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block hover:text-black dark:hover:text-white"
              >
                {t("nav.men")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block hover:text-black dark:hover:text-white"
              >
                {t("nav.women")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block hover:text-black dark:hover:text-white"
              >
                {t("nav.kids")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block hover:text-black dark:hover:text-white"
              >
                {t("nav.sale")}
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
