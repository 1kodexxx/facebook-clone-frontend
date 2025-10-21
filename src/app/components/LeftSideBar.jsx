"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, Home, MessageCircle, User, Users, Video } from "lucide-react";

const LeftSideBar = () => {
  return (
    <aside
      className={`fixed top-16 left-0 h-full w-64 p-4 bg-background border-r border-border/40 
      flex flex-col transition-transform duration-200 ease-in-out z-40 md:z-0`}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* ==== Навигация ==== */}
        <nav className="space-y-1 flex-grow">
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

        {/* ==== Нижний блок ==== */}
        <div className="mt-auto pt-4">
          <Separator className="my-4" />
          <div className="flex items-center gap-3 mb-3 cursor-pointer hover:bg-accent rounded-md p-2 transition-colors">
            <Avatar className="h-9 w-9">
              <AvatarImage />
              <AvatarFallback>D</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-[15px] leading-none">
              Sasha Pushkin
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            © 2025 Facebook Clone · All rights reserved
          </p>
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;
