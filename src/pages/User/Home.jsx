import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useProducts } from "../../api/hooks";
import ProductCard from "../../components/ProductCard";
import SkeletonLoader from "../../components/SkeletonLoader";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Home() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);

  const { data: productsData, isLoading } = useProducts({
    page,
    limit: 8,
    search: searchQuery,
  });

  const handleAddToCart = useCallback(() => {
    setToast({ type: "success", message: "Added to cart!" });
    setTimeout(() => setToast(null), 2000);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setPage(1);
  };

  const products = productsData?.data || [];
  const totalPages = productsData?.totalPages || 1;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Banner */}
      <section className="relative h-96 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full flex items-center justify-center text-9xl font-bold text-gray-300 dark:text-gray-600">
            NIKE
          </div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to NIKE
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            Discover the latest collection
          </p>
          <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition">
            {t("home.shop")}
          </button>
        </div>
      </section>

      {/* New & Featured */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
          {t("home.newAndFeatured")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Featured Items */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden group cursor-pointer h-80">
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center hover:scale-105 transition">
              <span className="text-gray-500 dark:text-gray-400 text-lg">
                Featured Item
              </span>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden group cursor-pointer h-80">
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center hover:scale-105 transition">
              <span className="text-gray-500 dark:text-gray-400 text-lg">
                Featured Item
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      {searchQuery && (
        <section className="max-w-7xl mx-auto px-4 mb-12">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <input
              type="text"
              placeholder={t("header.search")}
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white"
            />
          </div>
        </section>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {toast.message}
        </div>
      )}

      {/* Best of Air Max Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("home.bestOfAirMax")}
          </h2>
          <a
            href="#"
            className="text-black dark:text-white font-semibold hover:underline"
          >
            {t("home.shop")}
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isLoading ? (
            <SkeletonLoader count={4} />
          ) : products.length > 0 ? (
            products
              .slice(0, 4)
              .map((product, index) => (
                <ProductCard
                  key={`${product.id}-${index}`}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No products found
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Gear Up Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            {t("home.gearUp")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shop Men's */}
            <div className="group cursor-pointer">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden h-72 flex items-center justify-center mb-4 hover:shadow-lg transition">
                <span className="text-gray-500 dark:text-gray-400">
                  Men's Collection
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Shop Men's
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Explore premium athletic wear
              </p>
            </div>

            {/* Shop Women's */}
            <div className="group cursor-pointer">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden h-72 flex items-center justify-center mb-4 hover:shadow-lg transition">
                <span className="text-gray-500 dark:text-gray-400">
                  Women's Collection
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Shop Women's
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Explore premium athletic wear
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Essentials Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
          {t("home.theEssentials")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Icons Category */}
          <div className="group cursor-pointer">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden h-64 flex items-center justify-center mb-4 hover:shadow-lg transition">
              <span className="text-gray-400 dark:text-gray-500">Icons</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Icons
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-2">
              <li className="hover:text-gray-900 dark:hover:text-white">
                Air Force 1
              </li>
              <li className="hover:text-gray-900 dark:hover:text-white">
                Huarache
              </li>
              <li className="hover:text-gray-900 dark:hover:text-white">
                Air Max 90
              </li>
              <li className="hover:text-gray-900 dark:hover:text-white">
                Air Max 95
              </li>
            </ul>
          </div>

          {/* Shoes Category */}
          <div className="group cursor-pointer">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden h-64 flex items-center justify-center mb-4 hover:shadow-lg transition">
              <span className="text-gray-400 dark:text-gray-500">Shoes</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Shoes
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-2">
              <li className="hover:text-gray-900 dark:hover:text-white">
                All Shoes
              </li>
              <li className="hover:text-gray-900 dark:hover:text-white">
                Custom Shoes
              </li>
              <li className="hover:text-gray-900 dark:hover:text-white">
                Jordan Shoes
              </li>
              <li className="hover:text-gray-900 dark:hover:text-white">
                Running Shoes
              </li>
            </ul>
          </div>

          {/* Clothing Category */}
          <div className="group cursor-pointer">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden h-64 flex items-center justify-center mb-4 hover:shadow-lg transition">
              <span className="text-gray-400 dark:text-gray-500">Clothing</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Clothing
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-2">
              <li className="hover:text-gray-900 dark:hover:text-white">
                All Clothing
              </li>
              <li className="hover:text-gray-900 dark:hover:text-white">
                Modest Wear
              </li>
              <li className="hover:text-gray-900 dark:hover:text-white">
                Hoodies & Pullovers
              </li>
              <li className="hover:text-gray-900 dark:hover:text-white">
                Shirts & Tops
              </li>
            </ul>
          </div>

          {/* Kids Category */}
          <div className="group cursor-pointer">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden h-64 flex items-center justify-center mb-4 hover:shadow-lg transition">
              <span className="text-gray-400 dark:text-gray-500">Kids</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Kids'
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-2">
              <li className="hover:text-gray-900 dark:hover:text-white">
                Infant & Toddler Shoes
              </li>
              <li className="hover:text-gray-900 dark:hover:text-white">
                Kids' Shoes
              </li>
              <li className="hover:text-gray-900 dark:hover:text-white">
                Kids' Jordan Shoes
              </li>
              <li className="hover:text-gray-900 dark:hover:text-white">
                Kids' Basketball Shoes
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {searchQuery
              ? `${t("header.search")}: ${searchQuery}`
              : "All Products"}
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Page {page} of {totalPages}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isLoading ? (
            <SkeletonLoader count={8} />
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard
                key={`${product.id}-${index}`}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No products found
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mb-16">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setPage(idx + 1)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    page === idx + 1
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </section>

      {/* Featured Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-12">
            {t("home.gearUp")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500">{t("common.loading")}</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Shop Men's
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore the latest collection
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500">{t("common.loading")}</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Shop Women's
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore the latest collection
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
