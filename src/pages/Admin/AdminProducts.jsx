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
import { Plus, Edit2, Trash2, X } from "lucide-react";

function AdminProducts() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const { data: productsData } = useProducts({ limit: 100 });
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    price: Yup.number().required("Price is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.string().required("Image URL is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: editingProduct?.name || "",
      price: editingProduct?.price || "",
      category: editingProduct?.category || "",
      description: editingProduct?.description || "",
      image: editingProduct?.image || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (editingProduct) {
        updateProduct(
          { id: editingProduct.id, data: values },
          {
            onSuccess: () => {
              setIsModalOpen(false);
              setEditingProduct(null);
              formik.resetForm();
            },
          },
        );
      } else {
        createProduct(values, {
          onSuccess: () => {
            setIsModalOpen(false);
            formik.resetForm();
          },
        });
      }
    },
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    formik.resetForm();
  };

  const products = productsData?.data || [];

  return (
    <div>
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
        {products.length === 0 ? (
          <div className="p-8 text-center text-gray-600 dark:text-gray-400">
            No products found. Click "Add Product" to create one.
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
                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {product.description?.substring(0, 50)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm("Are you sure?")) {
                              deleteProduct(product.id);
                            }
                          }}
                          className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition"
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
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingProduct
                  ? t("admin.editProduct")
                  : t("admin.addProduct")}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={formik.handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps("name")}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white"
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
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...formik.getFieldProps("price")}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white"
                />
                {formik.touched.price && formik.errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.price}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Category
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps("category")}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white"
                  placeholder="Men's Shoes"
                />
                {formik.touched.category && formik.errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.category}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Description
                </label>
                <textarea
                  {...formik.getFieldProps("description")}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white"
                  rows="3"
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
                  Image URL
                </label>
                <input
                  type="url"
                  {...formik.getFieldProps("image")}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white"
                />
                {formik.touched.image && formik.errors.image && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.image}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  {t("common.cancel")}
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="flex-1 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating || isUpdating ? "..." : t("common.save")}
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
