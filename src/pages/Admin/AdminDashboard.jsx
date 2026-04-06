import React from "react";
import { useTranslation } from "react-i18next";
import { useProducts, useOrders } from "../../api/hooks";
import { TrendingUp, ShoppingBag, Users, DollarSign } from "lucide-react";

function AdminDashboard() {
  const { t } = useTranslation();
  const { data: productsData } = useProducts({ limit: 100 });
  const { data: ordersData } = useOrders();

  const products = productsData?.data || [];
  const orders = ordersData?.data || [];

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.total || 0),
    0,
  );

  const recentOrders = orders.slice(0, 5);
  const lowStockProducts = products.filter((p) => p.stock <= 10).slice(0, 5);

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: ShoppingBag,
      color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: TrendingUp,
      color:
        "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color:
        "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
    },
    {
      label: "Low Stock Items",
      value: lowStockProducts.length,
      icon: Users,
      color: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to your Nike Admin Dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Recent Orders
          </h2>
          {recentOrders.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              No orders yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Order #{order.id.toString().padStart(5, "0")}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {order.customerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ${Number(order.total || 0).toFixed(2)}
                    </p>
                    <p
                      className={`text-xs font-medium ${
                        order.status === "delivered"
                          ? "text-green-600 dark:text-green-400"
                          : order.status === "shipped"
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Low Stock Products
          </h2>
          {lowStockProducts.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              All products have sufficient stock
            </p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3 grow">
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.requestFullscreen = true;
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                    <div className="grow">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {product.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold text-sm px-2 py-1 rounded ${
                        product.stock <= 5
                          ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                          : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                      }`}
                    >
                      {product.stock} in stock
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
