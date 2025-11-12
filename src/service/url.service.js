// === src/service/url.service.js ===
import axios from "axios";

const ApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // например: "http://localhost:8080/api"

const axiosInstance = axios.create({
  baseURL: ApiUrl,
  withCredentials: true, // куки (auth_token) по умолчанию
});

// Если хочешь — можно добавить перехватчики ошибок/логов
// axiosInstance.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     // централизованный хэндлинг
//     return Promise.reject(err);
//   }
// );

export default axiosInstance;
