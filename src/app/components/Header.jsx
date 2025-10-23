"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Moon,
  Search,
  Sun,
  Users,
  Video,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSidebarStore from "../store/sidebarStore";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { toggleSidebar } = useSidebarStore();
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    // Фейковый logout
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <>
      {/* ==== ВЕРХНЯЯ ПАНЕЛЬ ==== */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-[rgb(36,37,38)] backdrop-blur-md shadow-sm">
        <div className="mx-auto flex items-center justify-between h-full px-3 sm:px-4 md:px-6 max-w-7xl">
          {/* ==== ЛОГОТИП + ПОИСК ==== */}
          <div className="flex items-center gap-3 md:gap-5 shrink-0">
            <Image
              src="/images/Facebook_Logo.png"
              width={38}
              height={38}
              alt="facebook_logo"
              priority
              className="cursor-pointer"
              onClick={() => handleNavigation("/")}
            />

            {/* ==== Поиск ==== */}
            <div className="relative hidden md:block">
              <form>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    className="pl-11 w-56 lg:w-72 h-10 bg-gray-100 dark:bg-[rgb(58,59,60)] rounded-full text-sm border-none focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    placeholder="Search Facebook..."
                    onFocus={() => setIsSearchOpen(true)}
                    onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                  />
                </div>

                {/* === Выпадающий блок поиска === */}
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 w-full bg-white dark:bg-[rgb(50,51,52)] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg mt-1 z-50"
                    >
                      <div className="p-2">
                        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                          <Avatar className="h-8 w-8">
                            <AvatarImage />
                            <AvatarFallback>D</AvatarFallback>
                          </Avatar>
                          <span className="text-gray-700 dark:text-gray-200">
                            Sasha Pushkin
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

          {/* ==== ЦЕНТРАЛЬНЫЕ ИКОНКИ ==== */}
          <nav className="hidden md:flex justify-center flex-1 max-w-md gap-10">
            {[
              { icon: Home, path: "/", label: "Home" },
              { icon: Video, path: "/video-feed", label: "Video" },
              { icon: Users, path: "/friends-list", label: "Friends" },
            ].map(({ icon: Icon, path, label }) => (
              <Button
                key={label}
                variant="ghost"
                size="icon"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-transparent transition-all"
                onClick={() => handleNavigation(path)}
                title={label}
              >
                <Icon size={26} />
              </Button>
            ))}
          </nav>

          {/* ==== ПРАВАЯ ЧАСТЬ ==== */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-600 dark:text-gray-300"
              onClick={toggleSidebar}
            >
              <Menu />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
              onClick={() => handleNavigation("/notifications")}
            >
              <Bell />
            </Button>

            {/* Messages */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:block text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
              onClick={() => handleNavigation("/messages")}
            >
              <MessageCircle />
            </Button>

            {/* ==== ДРОПДАУН ==== */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar>
                    <AvatarImage />
                    <AvatarFallback className="bg-gray-300 dark:bg-gray-600">
                      D
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-64 z-50 bg-white dark:bg-[rgb(44,45,46)] border-gray-200 dark:border-gray-700"
                align="end"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage />
                      <AvatarFallback>D</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none dark:text-gray-100">
                        Sasha Pushkin
                      </p>
                      <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                        pvntheraxxx@gmail.com
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="flex items-center gap-2 cursor-pointer dark:text-gray-200"
                  onClick={() => handleNavigation("/user-profile")}
                >
                  <Users size={16} />
                  <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex items-center gap-2 cursor-pointer dark:text-gray-200"
                  onClick={() => handleNavigation("/messages")}
                >
                  <MessageCircle size={16} />
                  <span>Messages</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Theme toggle with animation */}
                <DropdownMenuItem
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center gap-2 cursor-pointer dark:text-gray-200"
                >
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "light" ? (
                      <Moon className="size-4" />
                    ) : (
                      <Sun className="size-4" />
                    )}
                  </motion.div>
                  <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* ==== НИЖНЯЯ НАВИГАЦИЯ (ТОЛЬКО ДЛЯ МОБИЛЬНЫХ) ==== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[rgb(36,37,38)] border-t border-gray-200 dark:border-gray-700 md:hidden flex justify-around py-2 z-40">
        {[
          { icon: Home, path: "/", label: "Home" },
          { icon: Video, path: "/video-feed", label: "Video" },
          { icon: Users, path: "/friends-list", label: "Friends" },
        ].map(({ icon: Icon, path, label }) => (
          <Button
            key={label}
            variant="ghost"
            size="icon"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
            onClick={() => handleNavigation(path)}
            title={label}
          >
            <Icon size={24} />
          </Button>
        ))}
      </div>
    </>
  );
};

export default Header;
