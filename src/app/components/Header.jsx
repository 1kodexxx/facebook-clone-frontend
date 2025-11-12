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
import { logout } from "@/service/auth.service";
import useSidebarStore from "../store/sidebarStore";
import useUserStore from "../store/userStore";

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
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

const NAV_ITEMS = [
  { icon: Home, path: "/", label: "Home" },
  { icon: Video, path: "/video-feed", label: "Video" },
  { icon: Users, path: "/friends-list", label: "Friends" },
];

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // desktop dropdown
  const [isMobileSearch, setIsMobileSearch] = useState(false); // mobile slide
  const { theme, setTheme } = useTheme();
  const { toggleSidebar } = useSidebarStore();
  const router = useRouter();
  const pathname = usePathname();

  const { user, clearUser } = useUserStore();

  const userPlaceholder = useMemo(
    () =>
      user?.username
        ?.split(" ")
        .map((n) => n[0])
        .join("") || "U",
    [user?.username]
  );

  const isActive = (path) =>
    path === "/" ? pathname === "/" : pathname?.startsWith(path);

  const handleNavigation = (path) => router.push(path);

  const handleLogout = async () => {
    try {
      const res = await logout();
      clearUser();
      router.push("/user-login");
      toast.success(res?.message || "Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out");
    }
  };

  return (
    <>
      {/* === TOP BAR === */}
      <header
        className="
          fixed top-0 inset-x-0 z-[60] h-16
          border-b border-gray-200 dark:border-gray-800
          bg-white/90 dark:bg-[rgb(36,37,38)] backdrop-blur-md
        "
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto h-full max-w-7xl px-3 sm:px-4 md:px-6">
          <div className="flex items-center justify-between h-full">
            {/* LEFT: Logo + (Desktop search) / (Mobile search button) */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleSidebar}
                aria-label="Open menu"
              >
                <Menu />
              </Button>

              <Image
                src="/images/Facebook_Logo.png"
                width={36}
                height={36}
                alt="logo"
                priority
                className="cursor-pointer shrink-0"
                onClick={() => handleNavigation("/")}
              />

              {/* Desktop search */}
              <div className="relative hidden md:block">
                <form role="search" aria-label="Site">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      className="pl-11 w-56 lg:w-72 xl:w-96 h-10 bg-gray-100 dark:bg-[rgb(58,59,60)] rounded-full text-sm border-none focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                      placeholder="Search..."
                      onFocus={() => setIsSearchOpen(true)}
                      onBlur={() =>
                        setTimeout(() => setIsSearchOpen(false), 120)
                      }
                    />
                  </div>

                  {/* Desktop search dropdown */}
                  <AnimatePresence>
                    {isSearchOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.16 }}
                        className="absolute top-full left-0 w-full bg-white dark:bg-[rgb(50,51,52)] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg mt-1 z-[70]"
                      >
                        <div className="p-2">
                          <div className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                            <Avatar className="h-8 w-8">
                              {user?.profilePicture ? (
                                <AvatarImage
                                  src={user.profilePicture}
                                  alt={user?.username}
                                />
                              ) : (
                                <AvatarFallback>
                                  {userPlaceholder}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <span className="text-gray-700 dark:text-gray-200">
                              {user?.username}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>

              {/* Mobile search button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-700 dark:text-gray-200"
                onClick={() => setIsMobileSearch((v) => !v)}
                aria-label="Search"
              >
                <Search />
              </Button>
            </div>

            {/* CENTER: main nav (desktop/tablet) */}
            <nav className="hidden md:flex justify-center flex-1 max-w-md gap-4 lg:gap-8">
              {NAV_ITEMS.map(({ icon: Icon, path, label }) => {
                const active = isActive(path);
                return (
                  <Button
                    key={label}
                    variant="ghost"
                    size="icon"
                    className={`transition-all ${
                      active
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300"
                    } hover:text-blue-600 hover:bg-transparent`}
                    onClick={() => handleNavigation(path)}
                    aria-label={label}
                    title={label}
                  >
                    <Icon size={26} />
                  </Button>
                );
              })}
            </nav>

            {/* RIGHT: actions */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors hidden sm:inline-flex"
                onClick={() => handleNavigation("/notifications")}
                aria-label="Notifications"
              >
                <Bell />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors hidden md:inline-flex"
                onClick={() => handleNavigation("/messages")}
                aria-label="Messages"
              >
                <MessageCircle />
              </Button>

              {/* profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar>
                      {user?.profilePicture ? (
                        <AvatarImage
                          src={user?.profilePicture}
                          alt={user?.username}
                        />
                      ) : (
                        <AvatarFallback>{userPlaceholder}</AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-64 z-[80] bg-white dark:bg-[rgb(44,45,46)] border-gray-200 dark:border-gray-700"
                  align="end"
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        {user?.profilePicture ? (
                          <AvatarImage
                            src={user?.profilePicture}
                            alt={user?.username}
                          />
                        ) : (
                          <AvatarFallback>{userPlaceholder}</AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none dark:text-gray-100">
                          {user?.username}
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

                  <DropdownMenuItem
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
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
                    <span>
                      {theme === "light" ? "Dark Mode" : "Light Mode"}
                    </span>
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
        </div>

        {/* Mobile search slide-down */}
        <AnimatePresence>
          {isMobileSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[rgb(36,37,38)]"
            >
              <div className="max-w-7xl mx-auto px-3 pb-2 pt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    className="pl-11 w-full h-10 bg-gray-100 dark:bg-[rgb(58,59,60)] rounded-full text-sm border-none focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    placeholder="Search..."
                    autoFocus
                    onBlur={() =>
                      setTimeout(() => setIsMobileSearch(false), 120)
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* === BOTTOM NAV (mobile only) === */}
      <nav
        className="
          md:hidden fixed bottom-0 left-0 right-0 z-40
          bg-white dark:bg-[rgb(36,37,38)]
          border-t border-gray-200 dark:border-gray-700
          flex justify-around py-2
        "
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0px)" }}
        aria-label="Primary"
      >
        {NAV_ITEMS.map(({ icon: Icon, path, label }) => {
          const active = isActive(path);
          return (
            <Button
              key={label}
              variant="ghost"
              size="icon"
              className={`transition-colors ${
                active
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => handleNavigation(path)}
              title={label}
              aria-label={label}
            >
              <Icon size={24} />
            </Button>
          );
        })}
      </nav>
    </>
  );
};

export default Header;
