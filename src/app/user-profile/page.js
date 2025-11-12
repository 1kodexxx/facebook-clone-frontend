"use client";

import LeftSideBar from "../components/LeftSideBar";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";

const Page = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* фиксированный левый сайдбар */}
      <LeftSideBar />

      {/* контент с отступом под хедер и сайдбар */}
      <main className="pt-16 pb-16 md:pb-0 ml-0 md:ml-64">
        {/* внутренний контейнер */}
        <div className="max-w-6xl mx-auto px-0 sm:px-6 lg:px-8">
          <ProfileHeader />
          <ProfileTabs />
        </div>
      </main>
    </div>
  );
};

export default Page;
