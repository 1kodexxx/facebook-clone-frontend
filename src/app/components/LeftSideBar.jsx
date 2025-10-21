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

const LeftSideBar = () => {
  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 p-4 bg-background border-r border-border/40 
      flex flex-col justify-between transition-transform duration-200 ease-in-out z-40 md:z-0`}
    >
      {/* ==== Навигация ==== */}
      <div className="flex flex-col overflow-y-auto">
        <nav className="space-y-1">
          <div className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-accent rounded-md p-2 transition-colors">
            <Avatar className="h-10 w-10">
              <AvatarImage />
              <AvatarFallback>D</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-[15px] leading-none">
              Sasha Pushkin
            </span>
          </div>

          {[
            { icon: Home, label: "Home" },
            { icon: Users, label: "Friends" },
            { icon: Video, label: "Video" },
            { icon: User, label: "Profile" },
            { icon: MessageCircle, label: "Messages" },
            { icon: Bell, label: "Notifications" },
          ].map(({ icon: Icon, label }) => (
            <Button
              key={label}
              variant="ghost"
              className="w-full justify-start font-normal text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Icon className="mr-3 h-5 w-5" />
              {label}
            </Button>
          ))}
        </nav>
      </div>

      {/* ==== Футер (всегда внизу) ==== */}
      <div className="pt-4 border-t border-border/40">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-9 w-9">
            <AvatarImage />
            <AvatarFallback className="dark:bg-gray-400">D</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-[15px] leading-none">
            Sasha Pushkin
          </span>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <LogOut className="h-4 w-4 mr-2" />
            <span className="font-medium">Logout</span>
          </div>
          <p className="mt-2 text-xs">
            Privacy · Terms · Advertising · Meta © 2025
          </p>
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;
