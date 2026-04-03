import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProductById } from "../../api/hooks";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { ChevronLeft, Heart, Share2 } from "lucide-react";

function ProductDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [toast, setToast] = useState(null);

  const { data: product, isLoading, error } = useProductById(id);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setToast({ type: "error", message: "Please select size and color" });
      setTimeout(() => setToast(null), 2000);
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        size: selectedSize,
        color: selectedColor,
      }),
    );

    setToast({ type: "success", message: "Added to cart!" });
    setTimeout(() => setToast(null), 2000);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Product not found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">{t("common.loading")}</p>
      </div>
    );
  }

  const sizes = ["6", "7", "8", "9", "10", "11", "12", "13"];
  const colors = ["Black", "White", "Red", "Blue", "Gray"];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg z-50 text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="max-w-7xl mx-auto px-4 pt-8 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
      >
        <ChevronLeft size={20} />
        Back
      </button>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="flex flex-col gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden h-96 md:h-full">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {[1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-black dark:hover:border-white"
                >
                  <img
                    src={product?.image}
                    alt={`view-${idx}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Product Info */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {product?.category}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {product?.name}
                </h1>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  ${product?.price}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {product?.description}
                </p>
              </div>

              {/* Color Selection */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {t("product.color")}
                </h3>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition font-medium ${
                        selectedColor === color
                          ? "border-black bg-black text-white dark:bg-white dark:text-black"
                          : "border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:border-black dark:hover:border-white"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {t("product.size")}
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-lg border-2 transition font-medium ${
                        selectedSize === size
                          ? "border-black bg-black text-white dark:bg-white dark:text-black"
                          : "border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:border-black dark:hover:border-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {t("product.quantity")}
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-grow bg-black dark:bg-white text-white dark:text-black py-4 rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition"
              >
                {t("product.addToCart")}
              </button>
              <button className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center">
                <Heart size={20} />
              </button>
              <button className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
