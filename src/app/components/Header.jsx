"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Bell,
  Home,
  Menu,
  MessageCircle,
  Search,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-[rgb(36,37,38)] text-foreground shadow-md h-16 fixed top-0 left-0 right-0 z-50 p-2">
      <div className="mx-auto flex justify-between item-center p-2">
        <div className="flex items-center gap-2 md:gap-4">
          <Image
            src="/images/Facebook_Logo.png"
            width={40}
            height={40}
            alt="facebook_logo"
          />
          <div className="relative">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-8 w-40 md:w-64 h-10 bg-gray-100 dark:bg-[rgb(58,59,60)] rounded-full"
                  placeholder="Search facebook..."
                />
              </div>
              {isSearchOpen && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-md shadow-lg mt-1 z-50">
                  <div className="p-2">
                    <div className="flex items-center space-x-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                      <Search className="absolute text-sm text-gray-400" />
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage />
                          <AvatarFallback>D</AvatarFallback>
                        </Avatar>
                        <span>Sasha Pushkin</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <nav className="hidden md:flex justify-around w-[40%] max-w-md">
          {[
            { icon: Home, path: "/", name: "home" },
            { icon: Video, path: "/video-feed", name: "video" },
            { icon: Users, path: "/friends-list", name: "friends" },
          ].map(({ icon: Icon, path, name }) => (
            <Button
              key={name}
              variant="ghost"
              size="icon"
              className={`relative text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-transparent`}
            >
              <Icon />
            </Button>
          ))}
        </nav>
        {/* user profile menu  */}
        <div className="flex space-x-2 md:space-x-4 item-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-600 cursor-pointer"
          >
            <Menu />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:block text-gray-600 cursor-pointer pl-1"
          >
            <Bell />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:hidden text-gray-600 cursor-pointer pl-1"
          >
            <MessageCircle />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 z-50" align="end">
              <DropdownMenuLabel className="font-normal"></DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
