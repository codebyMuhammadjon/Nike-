import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

function ProductCard({ product, onAddToCart }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      }),
    );
    if (onAddToCart) onAddToCart();
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition group">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 h-64 md:h-72">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
          />
          <button className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <Heart size={20} className="text-gray-800 dark:text-gray-200" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            {product.category}
          </p>

          {/* Price */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-black dark:text-white">
              ${product.price}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            {t("product.addToCart")}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
