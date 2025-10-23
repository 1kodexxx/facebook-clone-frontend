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
import { useRouter } from "next/navigation"; // ✅ App Router
import useSidebarStore from "../store/sidebarStore";

const LeftSideBar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
    toggleSidebar(); // закрыть меню на мобильных после перехода
  };

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 p-4 border-r border-border/40 
      flex flex-col justify-between transition-transform duration-200 ease-in-out z-40
      bg-white dark:bg-[rgb(36,37,38)] shadow-lg
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0 md:shadow-none md:bg-transparent md:border-r`}
    >
      {/* ==== Навигация ==== */}
      <div className="flex flex-col overflow-y-auto">
        <nav className="space-y-1">
          <div
            className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-accent rounded-md p-2 transition-colors"
            onClick={() => handleNavigation("/profile")}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage />
              <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white">
                D
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold text-[15px] leading-none text-gray-900 dark:text-white">
              Sasha Pushkin
            </span>
          </div>

          {[
            { icon: Home, label: "Home", path: "/" },
            { icon: Users, label: "Friends", path: "/friends-list" },
            { icon: Video, label: "Video", path: "/video-feed" },
            { icon: User, label: "Profile", path: "/profile" },
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

      {/* ==== Футер ==== */}
      <div className="pt-4 border-t border-border/40">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-9 w-9">
            <AvatarImage />
            <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white">
              D
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-[15px] leading-none text-gray-900 dark:text-white">
            Sasha Pushkin
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
  );
};

export default LeftSideBar;
