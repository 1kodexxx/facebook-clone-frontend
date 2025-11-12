"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ShowStoryPreview from "./ShowStoryPreview";
4;

const StoryCard = ({ isAddStory, story }) => {
  const [postContent, setPostContent] = useState("");
  const { user } = useUserStore();
  const [filePreview, setFilePreview] = useState(null); // string (blob URL)
  const [selectedFile, setSelectedFile] = useState(null); // File
  const [loading, setLoading] = useState(false);
  const { handleCreateStory } = usePostStore();
  const { showPreview, setShowPreview } = useState(false);

  const fileInputRef = useRef(null);

  const userPlaceholder =
    user?.username
      ?.split(" ")
      .map((n) => n[0])
      .join("") || "U";

  const clearFile = () => {
    if (filePreview) URL.revokeObjectURL(filePreview);
    setSelectedFile(null);
    setFilePreview(null);
    setShowImageUpload(false);
  };

  useEffect(() => {
    if (!isPostFormOpen) {
      setShowEmojiPicker(false);
      clearFile();
    }
  }, [isPostFormOpen]); // eslint-disable-line

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileType(file.type);
    setFilePreview(URL.createObjectURL(file));
    setIsNewStory(true);
  };

  const handleStory = async () => {
    try {
      setLoading(true);
      if (selectedFile) formData.append("media", selectedFile);

      await handleCreateStory(formData);
      resetStoryState();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClosePreview = () => {
    resetStoryState();
  };

  const resetStoryState = () => {
    setShowPreview(false);
    setSelectedFile(null);
    setFilePreview(null);
    setIsPostFormOpen(false);
    setFileType(null);
    setIsNewStory(false);
  };

  const handleStoryClick = () => {
    setFilePreview(story?.mediaUrl);
    setFileType(story?.mediaType);
    setIsNewStory(false);
    setShowPreview(true);
  };

  const isImage = selectedFile ? selectedFile.type.startsWith("image") : false;
  const isVideo = selectedFile ? selectedFile.type.startsWith("video") : false;

  const openFilePicker = () =>
    fileInputRef.current && fileInputRef.current.click();

  const canPost =
    !loading && (postContent.trim().length > 0 || Boolean(selectedFile));

  return (
    <>
      <Card
        className="w-40 h-60 relative overflow-hidden group cursor-pointer rounded-xl"
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
                      alt={user?.username || "User"}
                      className="object-cover"
                    />
                  ) : (
                    <>
                      <p className="w-full h-full flex justify-center items-center text-4xl"></p>
                      <AvatarFallback>{userPlaceholder}</AvatarFallback>
                    </>
                  )}
                </Avatar>
              </div>
              <div className="h-1/4 w-full bg-white dark:bg-gray-800 flex flex-col items-center justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Plus className="h-5 w-5 text-white" />
                </Button>
                <p className="text-xs font-semibold mt-1">Create a story</p>
              </div>
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handle}
              />
            </div>
          ) : (
            <>
              {story?.mediaType === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={story?.mediaUrl}
                  alt={story?.user?.username || "Story"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={story?.mediaUrl}
                  alt={story?.user?.username || "Story"}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-2 left-2 ring-2 ring-blue-500 rounded-full">
                <Avatar className="h-8 w-8">
                  {user?.profilePicture ? (
                    <AvatarImage
                      src={user.profilePicture}
                      alt={user?.username || "User"}
                    />
                  ) : (
                    <AvatarFallback>{userPlaceholder}</AvatarFallback>
                  )}
                </Avatar>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-semibold">
                  {user?.username || "User"}
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
          onPost={handleCreateStory}
          isNewStory={isNewStory}
          username={isNewStory ? user?.username : story?.user?.username}
          avatar={isNewStory ? user?.profilePicture : story?.profilePicture}
          isLoading={loading}
        />
      )}
    </>
  );
};

export default StoryCard;
