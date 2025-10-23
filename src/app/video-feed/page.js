"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import LeftSideBar from "../components/LeftSideBar";
import VideoCard from "./VideoCard";

export default function VideoPage() {
  const videoPosts = [
    {
      mediaUrl: "", // можно вставить реальный mp4-URL для теста
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
    <div className="mt-12 min-h-screen dark:bg-[rgb(24,25,26)] bg-gray-50">
      <LeftSideBar />

      <main className="ml-0 md:ml-64 p-6">
        <Button
          variant="ghost"
          className="mb-4 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to feed
        </Button>

        <div className="max-w-3xl mx-auto">
          {videoPosts.map((post, index) => (
            <VideoCard key={index} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
