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
import { Input } from "@/components/ui/input";
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
import { useState } from "react";
import useSidebarStore from "../store/sidebarStore";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { toggleSidebar } = useSidebarStore();

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
            />

            {/* Поиск — только на >= md */}
            <div className="relative hidden md:block">
              <form>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    className="pl-9 w-56 lg:w-72 h-10 bg-gray-100 dark:bg-[rgb(58,59,60)] rounded-full text-sm border-none focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    placeholder="Search Facebook..."
                    onFocus={() => setIsSearchOpen(true)}
                    onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                  />
                </div>

                {isSearchOpen && (
                  <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg mt-1 z-50">
                    <div className="p-2">
                      <div className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                        <Avatar className="h-8 w-8">
                          <AvatarImage />
                          <AvatarFallback>D</AvatarFallback>
                        </Avatar>
                        <span>Sasha Pushkin</span>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* ==== ЦЕНТРАЛЬНЫЕ ИКОНКИ (ТОЛЬКО ДЕСКТОП) ==== */}
          <nav className="hidden md:flex justify-center flex-1 max-w-md gap-10">
            {[Home, Video, Users].map((Icon, i) => (
              <Button
                key={i}
                variant="ghost"
                size="icon"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-transparent transition-all"
              >
                <Icon size={26} />
              </Button>
            ))}
          </nav>

          {/* ==== ПРАВАЯ ЧАСТЬ ==== */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-600"
              onClick={toggleSidebar}
            >
              <Menu />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Bell />
            </Button>

            {/* Messages */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:block text-gray-600 hover:text-blue-600 transition-colors"
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

              <DropdownMenuContent className="w-64 z-50" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage />
                      <AvatarFallback>D</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Sasha Pushkin
                      </p>
                      <p className="text-xs mt-1 text-gray-500">
                        pvntheraxxx@gmail.com
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <Users size={16} />
                  <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <MessageCircle size={16} />
                  <span>Messages</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {theme === "light" ? (
                    <>
                      <Moon className="size-4" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="size-4" />
                      <span>Light Mode</span>
                    </>
                  )}
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600">
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
        {[Home, Video, Users].map((Icon, i) => (
          <Button
            key={i}
            variant="ghost"
            size="icon"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
          >
            <Icon size={24} />
          </Button>
        ))}
      </div>
    </>
  );
};

export default Header;
