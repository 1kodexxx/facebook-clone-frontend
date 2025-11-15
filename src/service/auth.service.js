// === src/service/auth.service.js ===
import axiosInstance from "./url.service";

// Регистрация пользователя
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);

    if (response?.data?.status === "success") {
      return response.data; // { status, code, message, data }
    }

    return null;
  } catch (error) {
    console.error("registerUser error:", error);
    throw error;
  }
};

// Логин пользователя
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/login", userData);

    if (response?.data?.status === "success") {
      return response.data; // { status, code, message, data }
    }

    return null;
  } catch (error) {
    console.error("loginUser error:", error);
    throw error;
  }
};

// Логаут пользователя
export const logout = async () => {
  try {
    // НЕ передаём userData, он не нужен
    const response = await axiosInstance.get("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("logout error:", error);
    // не пробрасываем, чтобы не ломать логику AuthWrapper
    return null;
  }
};

// Проверка авторизации
export const checkUserAuth = async () => {
  try {
    // ВАЖНО: ведущий слэш!
    const response = await axiosInstance.get("/users/check-auth");

    if (response?.data?.status === "success") {
      return {
        isAuthenticated: true,
        user: response.data.data,
      };
    }

    return { isAuthenticated: false };
  } catch (error) {
    console.error("checkUserAuth error:", error);
    return { isAuthenticated: false };
  }
};
