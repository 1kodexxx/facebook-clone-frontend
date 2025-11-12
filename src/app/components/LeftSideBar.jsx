"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Home,
  LogOut,
  MessageCircle,
  User,
  Users,
  Video,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSidebarStore from "../store/sidebarStore";
import useUserStore from "../store/userStore";

const LeftSideBar = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebarStore(
    (s) => ({
      isSidebarOpen: s.isSidebarOpen,
      toggleSidebar: s.toggleSidebar,
      closeSidebar:
        s.setIsSidebarOpen?.bind(null, false) ||
        (() => (s.isSidebarOpen = false)),
    })
  );
  const router = useRouter();
  const { user } = useUserStore();

  const userPlaceholder =
    user?.username
      ?.split(" ")
      .map((n) => n[0])
      .join("") || "U";

  const handleNavigation = (path) => {
    router.push(path);
    if (window.innerWidth < 768) toggleSidebar(); // закрыть на мобиле
  };

  // Закрытие ESC на мобиле
  useEffect(() => {
    const onKey = (e) =>
      e.key === "Escape" && isSidebarOpen && closeSidebar?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isSidebarOpen, closeSidebar]);

  return (
    <>
      {/* overlay only mobile */}
      <div
        aria-hidden
        onClick={toggleSidebar}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] md:hidden transition-opacity ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        role="dialog"
        aria-label="Main navigation"
        className={`
          fixed top-16 left-0 z-50 md:z-30
          h-[calc(100vh-4rem)]
          w-[80vw] max-w-[18rem] md:w-64 lg:w-72
          border-r border-border/40
          bg-white dark:bg-[rgb(36,37,38)]
          shadow-xl md:shadow-none
          transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col justify-between
          p-4
        `}
      >
        {/* Навигация */}
        <div className="flex flex-col overflow-y-auto">
          <nav className="space-y-1">
            <div
              className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-accent rounded-md p-2 transition-colors"
              onClick={() => handleNavigation("/")}
            >
              <Avatar className="h-10 w-10">
                {user?.profilePicture ? (
                  <AvatarImage
                    src={user?.profilePicture}
                    alt={user?.username}
                  />
                ) : (
                  <AvatarFallback>{userPlaceholder}</AvatarFallback>
                )}
              </Avatar>
              <span className="font-semibold text-[15px] leading-none text-gray-900 dark:text-white">
                {user?.username}
              </span>
            </div>

            {[
              { icon: Home, label: "Home", path: "/" },
              { icon: Users, label: "Friends", path: "/friends-list" },
              { icon: Video, label: "Video", path: "/video-feed" },
              { icon: User, label: "Profile", path: "/user-profile" },
              { icon: MessageCircle, label: "Messages", path: "/messages" },
              { icon: Bell, label: "Notifications", path: "/notifications" },
            ].map(({ icon: Icon, label, path }) => (
              <Button
                key={label}
                variant="ghost"
                className="w-full justify-start font-normal text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-gray-800 dark:text-gray-200"
                onClick={() => handleNavigation(path)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {label}
              </Button>
            ))}
          </nav>
        </div>

        {/* Футер */}
        <div className="pt-4 border-t border-border/40">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-9 w-9">
              {user?.profilePicture ? (
                <AvatarImage src={user?.profilePicture} alt={user?.username} />
              ) : (
                <AvatarFallback>{userPlaceholder}</AvatarFallback>
              )}
            </Avatar>
            <span className="font-semibold text-[15px] leading-none text-gray-900 dark:text-white">
              {user?.username}
            </span>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <div
              className="flex items-center text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:text-red-600 transition-colors"
              onClick={() => handleNavigation("/logout")}
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="font-medium">Logout</span>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Privacy · Terms · Advertising · Meta © 2025
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default LeftSideBar;
