"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import ProfileDetails from "./ProfileDetails";

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 mt-6 sm:mt-8">
      <Tabs
        defaultValue="posts"
        className="w-full"
        onValueChange={setActiveTab}
      >
        {/* На мобилке делаем горизонтальный скролл табов, чтобы не ломались */}
        <TabsList
          aria-label="Profile sections"
          className="w-full overflow-x-auto no-scrollbar
                     inline-flex gap-1 sm:gap-2 px-1 py-1
                     rounded-lg"
        >
          <div className="inline-flex min-w-full sm:min-w-0 gap-1 sm:gap-2">
            <TabsTrigger value="posts" className="flex-1 min-w-[96px]">
              Posts
            </TabsTrigger>
            <TabsTrigger value="about" className="flex-1 min-w-[96px]">
              About
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex-1 min-w-[96px]">
              Friends
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex-1 min-w-[96px]">
              Photos
            </TabsTrigger>
          </div>
        </TabsList>

        <div className="mt-4 sm:mt-6">
          <ProfileDetails activeTab={activeTab} />
        </div>
      </Tabs>

      {/* скрываем нативный скроллбар у табов в webkit */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProfileTabs;
