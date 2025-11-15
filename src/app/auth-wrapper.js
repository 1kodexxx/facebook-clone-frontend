// === src/app/auth-wrapper.js ===
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loader from "@/lib/Loader";
import { checkUserAuth, logout } from "@/service/auth.service";
import Header from "../components/layout/Header";
import userStore from "./store/useUserStore";

export default function AuthWrapper({ children }) {
  const { setUser, clearUser } = userStore();
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isLoginPage = pathname === "/user-login";

  useEffect(() => {
    let isMounted = true;

    const fireLogout = () => {
      clearUser();
      if (isMounted) setIsAuthenticated(false);

      // НЕ ждём ответа, просто отправляем запрос
      logout().catch((err) => {
        console.error("Logout request failed:", err);
      });

      if (!isLoginPage) {
        router.push("/user-login");
      }
    };

    const checkAuth = async () => {
      console.log("[AuthWrapper] checkAuth start, pathname:", pathname);

      try {
        const result = await checkUserAuth();
        console.log("[AuthWrapper] checkUserAuth result:", result);

        if (!isMounted) return;

        if (result?.isAuthenticated && result.user) {
          setUser(result.user);
          setIsAuthenticated(true);
          console.log("[AuthWrapper] authenticated, user:", result.user);
        } else {
          console.log("[AuthWrapper] not authenticated, calling fireLogout");
          fireLogout();
        }
      } catch (error) {
        console.error("[AuthWrapper] Authentication check failed:", error);
        fireLogout();
      } finally {
        if (isMounted) {
          console.log("[AuthWrapper] setLoading(false)");
          setLoading(false);
        }
      }
    };

    if (!isLoginPage) {
      setLoading(true);
      checkAuth();
    } else {
      // На странице логина просто не проверяем auth
      setIsAuthenticated(false);
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [isLoginPage, pathname, router, setUser, clearUser]);

  if (loading) {
    return <Loader />; // твой синий экран с логотипом
  }

  return (
    <>
      {!isLoginPage && isAuthenticated && <Header />}
      {(isAuthenticated || isLoginPage) && children}
    </>
  );
}
