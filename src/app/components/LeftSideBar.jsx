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
import useSidebarStore from "../store/sidebarStore";
import useUserStore from "../store/userStore";

const LeftSideBar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();
  const router = useRouter();
  const { user } = useUserStore();

  const handleNavigation = (path) => {
    router.push(path);
    // закрываем только на мобильных; на md+ меню закреплено
    if (window.innerWidth < 768) toggleSidebar();
  };

  const userPlaceholder =
    user?.username
      ?.split(" ")
      .map((n) => n[0])
      .join("") || "U";

  return (
    <aside
      // ширина сайдбара 16rem; на md+ он всегда видим и не перекрывает контент
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 p-4
      border-r border-border/40 bg-white dark:bg-[rgb(36,37,38)]
      transition-transform duration-200 ease-in-out
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0 md:shadow-none md:bg-transparent md:border-r
      z-40 md:z-20`}
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col justify-between overflow-y-auto">
        <nav className="space-y-1">
          <div
            className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-accent rounded-md p-2 transition-colors"
            onClick={() => handleNavigation("/")}
          >
            <Avatar className="h-10 w-10">
              {user?.profilePicture ? (
                <AvatarImage src={user.profilePicture} alt={user?.username} />
              ) : (
                <AvatarFallback>{userPlaceholder}</AvatarFallback>
              )}
            </Avatar>
            <span className="font-semibold text-[15px] leading-none text-gray-900 dark:text-white truncate">
              {user?.username || "User"}
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
              <span className="truncate">{label}</span>
            </Button>
          ))}
        </nav>

        <div className="pt-4 border-t border-border/40">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-9 w-9">
              {user?.profilePicture ? (
                <AvatarImage src={user.profilePicture} alt={user?.username} />
              ) : (
                <AvatarFallback>{userPlaceholder}</AvatarFallback>
              )}
            </Avatar>
            <span className="font-semibold text-[15px] leading-none text-gray-900 dark:text-white truncate">
              {user?.username || "User"}
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
      </div>
    </aside>
  );
};

export default LeftSideBar;
