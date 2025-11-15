// === src/service/url.service.js ===
import axios from "axios";

const ApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
// В .env фронта:
// NEXT_PUBLIC_BACKEND_URL=http://localhost:8080

const axiosInstance = axios.create({
  baseURL: ApiUrl,
  withCredentials: true, // куки (auth_token) будут автоматически отправляться
});

export default axiosInstance;
