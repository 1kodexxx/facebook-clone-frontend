import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { X } from "lucide-react";

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
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative w-full max-w-md h-[70vh] flex flex-col bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <Button
          className="absolute top-4 right-4 z-10 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          variant="ghost"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        <div className="absolute top-4 left-4 z-10 flex items-center">
          <Avatar className="w-10 h-10 mr-2">
            {avatar ? (
              <AvatarImage src={avatar} alt={username} />
            ) : (
              <AvatarFallback>{username}</AvatarFallback>
            )}
            <span className="text-gray-700 dark:text-gray-200 font-semibold">
              {username}
            </span>
          </Avatar>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900"></div>
      {fileType === "image" ? (
        <img
          src={file}
          alt="story_preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <video src={file} controls className="w-full h-full object-cover" />
      )}
    </div>
  );
};

export default ShowStoryPreview;
