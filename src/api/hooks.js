import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./axiosConfig";

// Products
export const useProducts = (params = {}) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/products", { params });
        console.log("Products fetched:", response.data);
        return response.data;
      } catch (error) {
        console.error(
          "Error fetching products:",
          error.message,
          error.response?.data,
        );
        throw error;
      }
    },
  });
};

export const useProductById = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Search products
export const useSearchProducts = (query) => {
  return useQuery({
    queryKey: ["searchProducts", query],
    queryFn: async () => {
      const response = await apiClient.get("/products/search", {
        params: { q: query },
      });
      return response.data;
    },
    enabled: query.length > 0,
  });
};

// Auth
export const useAdminLogin = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      try {
        console.log("Attempting admin login with:", credentials);
        const response = await apiClient.post("/auth/login", credentials);
        console.log("Admin login successful:", response.data);
        return response.data;
      } catch (error) {
        console.error(
          "Admin login failed:",
          error.message,
          error.response?.data,
        );
        throw error;
      }
    },
  });
};

// Orders
export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await apiClient.get("/orders");
      return response.data;
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderData) => {
      const response = await apiClient.post("/orders", orderData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// Admin Product Management
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productData) => {
      const response = await apiClient.post("/products", productData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await apiClient.put(`/products/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await apiClient.delete(`/products/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// Order Management
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await apiClient.patch(`/orders/${id}`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await apiClient.patch(`/orders/${id}`, {
        status: "CANCELLED",
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
