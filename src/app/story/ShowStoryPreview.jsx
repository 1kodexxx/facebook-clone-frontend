"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const ShowStoryPreview = ({
  file,
  fileType,
  onClose,
  onPost,
  isNewStory,
  username,
  avatar,
  isLoading,
}) => {
  const userPlaceholder =
    username
      ?.split(" ")
      .map((n) => n[0])
      .join("") || "U";

  // блокируем скролл боди, снимаем по закрытию
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const modal = (
    <div
      className="fixed inset-0 z-[100000] isolate grid place-items-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Story preview"
    >
      <div className="relative w-full max-w-md h-[70vh] min-h-0 flex flex-col rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-2xl">
        <Button
          className="absolute top-4 right-4 z-10 text-gray-700 dark:text-gray-200 hover:bg-gray-200/60 dark:hover:bg-gray-700/60"
          variant="ghost"
          onClick={onClose}
          aria-label="Close preview"
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="absolute top-4 left-4 z-10 flex items-center">
          <Avatar className="w-10 h-10 mr-2">
            {avatar ? (
              <AvatarImage src={avatar} alt={username || "user"} />
            ) : (
              <AvatarFallback>{userPlaceholder}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-gray-700 dark:text-gray-200 font-semibold">
            {username}
          </span>
        </div>

        <div className="flex-1 min-h-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          {fileType === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={file || ""}
              alt="story preview"
              className="w-full h-full object-contain"
            />
          ) : (
            <video
              src={file || ""}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {isNewStory && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <Button
              onClick={onPost}
              disabled={!!isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isLoading ? "Saving…" : "Share"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  // важное: портал в body, чтобы избежать влияния transform у предков
  if (typeof window === "undefined") return null;
  return createPortal(modal, document.body);
};

export default ShowStoryPreview;
