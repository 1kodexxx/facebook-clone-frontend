"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import LeftSideBar from "../components/LeftSideBar";
import VideoCard from "./VideoCard";

export default function VideoPage() {
  const router = useRouter();

  const videoPosts = [
    {
      mediaUrl: "", // вставь mp4 для теста
      mediaType: "video",
      user: { username: "Sasha" },
      comments: [
        {
          user: { username: "Sasha" },
          text: "Nice picture",
          createdAt: "20-04-2024",
        },
      ],
    },
  ];

  return (
    <div className="mt-12 min-h-screen bg-gray-50 dark:bg-[rgb(24,25,26)] overflow-x-hidden">
      <LeftSideBar />

      <main className="ml-0 md:ml-64 px-3 sm:px-4 py-4 sm:py-6">
        <div className="max-w-[100vw] sm:max-w-2xl lg:max-w-3xl mx-auto">
          <Button
            variant="ghost"
            className="mb-3 sm:mb-4 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => router.back()}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            <span className="hidden xs:inline">Back to feed</span>
          </Button>

          <div className="space-y-4 sm:space-y-6">
            {videoPosts.map((post, index) => (
              <VideoCard key={index} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
