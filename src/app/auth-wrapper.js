"use client";

import Loader from "@/lib/Loader";
import { checkUserAuth, logout } from "@/service/auth.service";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import userStore from "./store/userStore";

export default function AuthWrapper({ children }) {
  const { setUser, clearUser } = userStore();
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isLoginPage = pathname === "/user-login";

  useEffect(() => {
    let isMounted = true;

    const handleLogout = async () => {
      clearUser();
      if (isMounted) setIsAuthenticated(false);
      try {
        await logout();
      } catch (error) {
        console.log("Logout failed, please try again later", error);
      }
      if (!isLoginPage) router.push("/user-login");
    };

    const checkAuth = async () => {
      try {
        const result = await checkUserAuth();
        if (!isMounted) return;

        if (result?.isAuthenticated) {
          setUser(result.user);
          setIsAuthenticated(true);
        } else {
          await handleLogout();
        }
      } catch (error) {
        console.error("Authentication check failed", error);
        await handleLogout();
      } finally {
        if (isMounted) setLoading(false); // важно: false, а не true
      }
    };

    if (!isLoginPage) {
      checkAuth();
    } else {
      setLoading(false);
      setIsAuthenticated(false);
    }

    return () => {
      isMounted = false;
    };
  }, [isLoginPage, router, setUser, clearUser]);

  if (loading) return <Loader />;

  return (
    <>
      {!isLoginPage && isAuthenticated && <Header />}
      {(isAuthenticated || isLoginPage) && children}
    </>
  );
}
