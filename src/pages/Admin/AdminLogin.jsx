import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAdminLogin } from "../../api/hooks";
import { setToken, setRole, setUser } from "../../store/slices/authSlice";
import { useTranslation } from "react-i18next";

function AdminLogin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate: adminLogin, isPending } = useAdminLogin();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      adminLogin(values, {
        onSuccess: (data) => {
          dispatch(setToken(data.token));
          dispatch(setRole("admin"));
          dispatch(setUser(data.user));
          navigate("/admin/products");
        },
      });
    },
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
            NIKE
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{t("admin.login")}</p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              {t("admin.username")}
            </label>
            <input
              type="text"
              {...formik.getFieldProps("username")}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white"
              placeholder="admin"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              {t("admin.password")}
            </label>
            <input
              type="password"
              {...formik.getFieldProps("password")}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-gray-900 dark:text-white"
              placeholder="••••••"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Logging in..." : t("admin.login")}
          </button>
        </form>

        {/* Back to Shop */}
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Not an admin?</p>
          <button
            onClick={() => navigate("/")}
            className="text-black dark:text-white font-medium hover:underline"
          >
            Go to Shop
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
