"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { usePostStore } from "../store/usePostStore";
import userStore from "../store/userStore";
import ShowStoryPreview from "./ShowStoryPreview";

const StoryCard = ({ isAddStory, story }) => {
  const { user } = userStore();
  const { handleCreateStory } = usePostStore();

  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isNewStory, setIsNewStory] = useState(false);

  const fileInputRef = useRef(null);

  const userPlaceholder =
    ((isAddStory ? user?.username : story?.user?.username) || "")
      .split(" ")
      .map((name) => name[0])
      .join("") || "U";

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // позволяем выбрать тот же файл снова
    if (!file) return;

    const type = file.type.startsWith("video") ? "video" : "image";
    const url = URL.createObjectURL(file);

    setSelectedFile(file);
    setFileType(type);
    setFilePreview(url);
    setIsNewStory(true);
    setShowPreview(true);
  };

  const resetStoryState = () => {
    if (
      filePreview &&
      typeof filePreview === "string" &&
      filePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(filePreview);
    }
    setShowPreview(false);
    setSelectedFile(null);
    setFilePreview(null);
    setFileType("");
    setIsNewStory(false);
    setLoading(false);
  };

  const handleCreateStoryPost = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (selectedFile) formData.append("media", selectedFile);
      await handleCreateStory(formData);
      resetStoryState();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleClosePreview = () => resetStoryState();

  const handleStoryClick = () => {
    if (!story) return;
    setFilePreview(story.mediaUrl);
    setFileType(story.mediaType);
    setIsNewStory(false);
    setShowPreview(true);
  };

  return (
    <>
      <Card
        className="
          relative overflow-hidden group cursor-pointer rounded-xl
          w-32 h-48
          xs:w-36 xs:h-52
          sm:w-40 sm:h-60
          md:w-44 md:h-64
          lg:w-44 lg:h-64
          flex-shrink-0
        "
        onClick={isAddStory ? undefined : handleStoryClick}
      >
        <CardContent className="p-0 h-full">
          {isAddStory ? (
            <div className="w-full h-full flex flex-col">
              <div className="h-3/4 w-full relative border-b">
                <Avatar className="w-full h-full rounded-none">
                  {user?.profilePicture ? (
                    <AvatarImage
                      src={user.profilePicture}
                      alt={user?.username || "you"}
                      className="object-cover"
                    />
                  ) : (
                    <p className="w-full h-full grid place-items-center text-3xl sm:text-4xl">
                      {userPlaceholder}
                    </p>
                  )}
                </Avatar>
              </div>
              <div className="h-1/4 w-full bg-white dark:bg-gray-800 flex flex-col items-center justify-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="p-0 h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  aria-label="Add story"
                >
                  <Plus className="h-5 w-5 text-white" />
                </Button>
                <p className="text-[11px] sm:text-xs font-semibold mt-1">
                  Create Story
                </p>
              </div>
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <>
              {story?.mediaType === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={story?.mediaUrl}
                  alt={story?.user?.username || "story"}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              ) : (
                <video
                  src={story?.mediaUrl}
                  className="w-full h-full object-cover"
                  controls={false}
                  muted
                  playsInline
                />
              )}

              <div className="absolute top-2 left-2 ring-2 ring-blue-500 rounded-full">
                <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
                  {story?.user?.profilePicture ? (
                    <AvatarImage
                      src={story.user.profilePicture}
                      alt={story?.user?.username || "author"}
                    />
                  ) : (
                    <AvatarFallback>{userPlaceholder}</AvatarFallback>
                  )}
                </Avatar>
              </div>

              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-[11px] sm:text-xs font-semibold truncate drop-shadow">
                  {story?.user?.username}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {showPreview && (
        <ShowStoryPreview
          file={filePreview}
          fileType={fileType}
          onClose={handleClosePreview}
          onPost={handleCreateStoryPost}
          isNewStory={isNewStory}
          username={isNewStory ? user?.username : story?.user?.username}
          avatar={
            isNewStory ? user?.profilePicture : story?.user?.profilePicture
          }
          isLoading={loading}
        />
      )}
    </>
  );
};

export default StoryCard;
