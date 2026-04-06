import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "../../api/hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Plus, Edit2, Trash2, X, AlertCircle, CheckCircle } from "lucide-react";

function AdminProducts() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: productsData,
    isLoading,
    error: fetchError,
  } = useProducts({ limit: 100 });
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    price: Yup.number()
      .min(0, "Price must be positive")
      .required("Price is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
    image: Yup.string()
      .url("Must be a valid URL")
      .required("Image URL is required"),
    stock: Yup.number()
      .min(0, "Stock must be positive")
      .required("Stock is required"),
    color: Yup.string().required("Color is required"),
    size: Yup.string().required("Size is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: editingProduct?.name || "",
      price: editingProduct?.price || "",
      category: editingProduct?.category || "",
      description: editingProduct?.description || "",
      image: editingProduct?.image || "",
      stock: editingProduct?.stock || 10,
      color: editingProduct?.color || "",
      size: editingProduct?.size || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setErrorMessage("");
      setSuccessMessage("");

      if (editingProduct) {
        updateProduct(
          { id: editingProduct.id, data: values },
          {
            onSuccess: () => {
              setSuccessMessage("Product updated successfully!");
              setIsModalOpen(false);
              setEditingProduct(null);
              formik.resetForm();
              setTimeout(() => setSuccessMessage(""), 3000);
            },
            onError: (err) => {
              const msg =
                err.response?.data?.message || "Failed to update product";
              setErrorMessage(msg);
            },
          },
        );
      } else {
        createProduct(values, {
          onSuccess: () => {
            setSuccessMessage("Product created successfully!");
            setIsModalOpen(false);
            formik.resetForm();
            setTimeout(() => setSuccessMessage(""), 3000);
          },
          onError: (err) => {
            const msg =
              err.response?.data?.message || "Failed to create product";
            setErrorMessage(msg);
          },
        });
      }
    },
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setErrorMessage("");
    setSuccessMessage("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    formik.resetForm();
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id, {
        onSuccess: () => {
          setSuccessMessage("Product deleted successfully!");
          setTimeout(() => setSuccessMessage(""), 3000);
        },
        onError: (err) => {
          const msg = err.response?.data?.message || "Failed to delete product";
          setErrorMessage(msg);
        },
      });
    }
  };

  const products = productsData?.data || [];

  return (
    <div>
      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle size={20} />
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} />
          {errorMessage}
        </div>
      )}

      {/* Fetch Error */}
      {fetchError && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} />
          Failed to load products. Please refresh the page.
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("admin.products")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your Nike product catalog
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setErrorMessage("");
            setSuccessMessage("");
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition"
        >
          <Plus size={20} />
          {t("admin.addProduct")}
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin">
              <div className="w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-black dark:border-t-white rounded-full"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              {t("common.loading")}
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-600 dark:text-gray-400">
            <p className="text-lg font-medium mb-2">No products found</p>
            <p className="text-sm">
              Click "Add Product" to create your first product.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Color
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/100?text=No+Image";
                            }}
                          />
                        </div>
                        <div className="grow">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {product.description?.substring(0, 40)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.stock > 10
                            ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200"
                            : product.stock > 0
                              ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200"
                              : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                          style={{
                            backgroundColor: product.color
                              ? product.color.toLowerCase()
                              : "#ccc",
                          }}
                          title={product.color}
                        />
                        <span>{product.color}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition disabled:opacity-50"
                          disabled={isDeleting}
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition disabled:opacity-50"
                          disabled={isDeleting}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingProduct
                  ? t("admin.editProduct")
                  : t("admin.addProduct")}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                disabled={isCreating || isUpdating}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={formik.handleSubmit} className="p-6 space-y-4">
              {/* Modal Error Message */}
              {errorMessage && (
                <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm flex items-center gap-2">
                  <AlertCircle size={16} />
                  {errorMessage}
                </div>
              )}

              {/* Grid 2 columns */}
              <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps("name")}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white"
                    placeholder="Nike Air Max..."
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.name}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...formik.getFieldProps("price")}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white"
                    placeholder="120.00"
                  />
                  {formik.touched.price && formik.errors.price && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.price}
                    </p>
                  )}
                </div>
              </div>

              {/* Grid 2 columns */}
              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Category *
                  </label>
                  <select
                    {...formik.getFieldProps("category")}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white"
                  >
                    <option value="">Select a category</option>
                    <option value="Men's Shoes">Men's Shoes</option>
                    <option value="Women's Shoes">Women's Shoes</option>
                    <option value="Kids' Shoes">Kids' Shoes</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                  {formik.touched.category && formik.errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.category}
                    </p>
                  )}
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...formik.getFieldProps("stock")}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white"
                    placeholder="10"
                  />
                  {formik.touched.stock && formik.errors.stock && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.stock}
                    </p>
                  )}
                </div>
              </div>

              {/* Grid 2 columns */}
              <div className="grid grid-cols-2 gap-4">
                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Color *
                  </label>
                  <select
                    {...formik.getFieldProps("color")}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white"
                  >
                    <option value="">Select a color</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Gray">Gray</option>
                    <option value="Navy">Navy</option>
                    <option value="Brown">Brown</option>
                  </select>
                  {formik.touched.color && formik.errors.color && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.color}
                    </p>
                  )}
                </div>

                {/* Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Size *
                  </label>
                  <select
                    {...formik.getFieldProps("size")}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white"
                  >
                    <option value="">Select a size</option>
                    <option value="6">6</option>
                    <option value="6.5">6.5</option>
                    <option value="7">7</option>
                    <option value="7.5">7.5</option>
                    <option value="8">8</option>
                    <option value="8.5">8.5</option>
                    <option value="9">9</option>
                    <option value="9.5">9.5</option>
                    <option value="10">10</option>
                    <option value="10.5">10.5</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                  </select>
                  {formik.touched.size && formik.errors.size && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.size}
                    </p>
                  )}
                </div>
              </div>

              {/* Description - Full width */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Description *
                </label>
                <textarea
                  {...formik.getFieldProps("description")}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white"
                  rows="3"
                  placeholder="Describe the product features and details..."
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.description}
                  </p>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  {...formik.getFieldProps("image")}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white"
                  placeholder="https://example.com/image.jpg"
                />
                {formik.touched.image && formik.errors.image && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.image}
                  </p>
                )}

                {/* Image Preview */}
                {formik.values.image && !formik.errors.image && (
                  <div className="mt-3 flex items-center gap-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Preview:
                    </p>
                    <img
                      src={formik.values.image}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/100?text=Invalid";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isCreating || isUpdating}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t("common.cancel")}
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="flex-1 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isCreating || isUpdating ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin mr-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
                      </div>
                      {t("common.save")}
                    </span>
                  ) : (
                    t("common.save")
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
