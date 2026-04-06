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
  const [error, setError] = React.useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .trim("Username cannot contain leading or trailing spaces"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .required("Password is required")
      .trim("Password cannot contain leading or trailing spaces"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setError("");
      // Trim whitespace from credentials
      const trimmedCredentials = {
        username: values.username.trim(),
        password: values.password.trim(),
      };
      adminLogin(trimmedCredentials, {
        onSuccess: (responseData) => {
          try {
            // Extract token from nested data structure
            // Response structure: { message: "Success", data: { token: "...", user: {...} } }
            const token = responseData?.data?.token;
            const user = responseData?.data?.user;

            if (!token) {
              setError("Token not received from server");
              console.error("No token in response:", responseData);
              return;
            }

            // Save token to localStorage
            localStorage.setItem("token", token);
            console.log("Token saved to localStorage:", token);

            // Dispatch auth actions to Redux
            dispatch(setToken(token));
            dispatch(setRole("admin"));
            dispatch(setUser(user || { id: 1, username: "admin" }));

            // Redirect to admin dashboard
            console.log("Redirecting to admin dashboard...");
            navigate("/admin", { replace: true });
          } catch (err) {
            console.error("Error processing login response:", err);
            setError("An error occurred while processing login");
          }
        },
        onError: (err) => {
          const errorMessage =
            err.response?.data?.message || "Login failed. Please try again.";
          setError(errorMessage);
          console.error("Login error:", err);
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
          {/* Info Box */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>Demo Credentials:</strong>
            </p>
            <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
              Username:{" "}
              <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                admin
              </code>
            </p>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Password:{" "}
              <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                admin
              </code>
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

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
