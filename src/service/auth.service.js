import axiosInstance from "./url.service";

// SignUp user
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    if (response?.data?.status === "success") {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/login", userData);
    if (response?.data?.status === "success") {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// Logout User
export const logout = async (userData) => {
  try {
    const response = await axiosInstance.get("/auth/logout", userData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Check auth api
export const checkUserAuth = async () => {
  try {
    const response = await axiosInstance.get("users/check-auth");
    if (response.data.status === "success") {
      return { isAuthenticated: true, user: response?.data?.data };
    } else if (response.status === "error") {
      return { isAuthenticated: false };
    }
  } catch (error) {
    console.log(error);
    return { isAuthenticated: false };
  }
};
