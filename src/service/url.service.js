// === src/service/url.service.js ===
// Общий axios-инстанс для работы с бэкендом
import axios from "axios";

/**
 * Базовый URL бэкенда берём из переменной окружения фронта.
 *
 * В .env (фронт):
 * NEXT_PUBLIC_BACKEND_URL = http://localhost:8080
 * или, например,
 * NEXT_PUBLIC_BACKEND_URL = https://api.mysocial.ru
 */

const ApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!ApiUrl) {
  // Это поможет быстрее понять, почему не работают запросы
  console.warn(
    "⚠️ NEXT_PUBLIC_BACKEND_URL не задан. Укажи адрес бэкенда в .env фронта."
  );
}

/**
 * Создаём преднастроенный axios-инстанс:
 * - baseURL - адрес бэкенда
 * - withCredentials - автоматически отправлять куки (auth_token)
 */

const axiosInstance = axios.create({
  baseUrl: ApiUrl,
  withCredentials: true,
});

export default axiosInstance;
