"use client";

/**
 * 🔄 Глобальный лоадер приложения
 * Показывается поверх экрана во время загрузки данных или инициализации приложения.
 * Использует анимации framer-motion.
 */

import { motion } from "framer-motion";

// Варианты анимации для трёх "точек" под логотипом
const dotVariants = {
  hidden: { opacity: 0.3, scale: 0.5 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2,
      repeat: Infinity,
      repeatType: "reverse",
      duration: 0.6,
    },
  }),
};

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-blue-600 dark:bg-blue-200">
      {/* Иконка Facebook в круге */}
      <div className="relative h-40 w-40">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-full w-full text-white"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </motion.svg>
      </div>

      {/* Анимированные точки под логотипом */}
      <div className="flex space-x-3">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="h-6 w-6 rounded-full bg-white"
            initial="hidden"
            animate="visible"
            custom={index}
            variants={dotVariants}
          />
        ))}
      </div>

      {/* Подпись под логотипом (на русском) */}
      <motion.div
        className="mt-4 text-3xl font-bold tracking-widest text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Facebook
      </motion.div>
    </div>
  );
}
