"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useCallback, useEffect } from "react";
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

  // закрытие по ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleBackdrop = useCallback(
    (e) => {
      // клик по фону — закрыть
      if (e.target === e.currentTarget) onClose?.();
    },
    [onClose]
  );

  const modal = (
    <div
      className="
        fixed inset-0 z-[100000] isolate grid place-items-center
        bg-black/70 p-0 sm:p-4
        [padding-inline:env(safe-area-inset-left)_env(safe-area-inset-right)]
        [padding-bottom:env(safe-area-inset-bottom)]
      "
      role="dialog"
      aria-modal="true"
      aria-label="Story preview"
      onClick={handleBackdrop}
    >
      <div
        className="
          relative w-screen h-screen sm:w-full sm:max-w-md sm:h-[78vh]
          min-h-0 flex flex-col rounded-none sm:rounded-lg overflow-hidden
          bg-white dark:bg-gray-800 shadow-2xl
        "
      >
        <Button
          className="
            absolute top-4 right-4 z-10
            text-gray-700 dark:text-gray-200
            hover:bg-gray-200/60 dark:hover:bg-gray-700/60
          "
          variant="ghost"
          onClick={onClose}
          aria-label="Close preview"
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="absolute top-4 left-4 z-10 flex items-center max-w-[80%]">
          <Avatar className="w-9 h-9 mr-2">
            {avatar ? (
              <AvatarImage src={avatar} alt={username || "user"} />
            ) : (
              <AvatarFallback>{userPlaceholder}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-gray-800 dark:text-gray-100 font-semibold truncate">
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
              draggable={false}
            />
          ) : (
            <video
              src={file || ""}
              controls
              autoPlay
              playsInline
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

  // портал в body, чтобы избежать влияния transform у предков
  if (typeof window === "undefined") return null;
  return createPortal(modal, document.body);
};

export default ShowStoryPreview;
