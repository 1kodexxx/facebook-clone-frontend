"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { ImageIcon, Laugh, Plus, Video, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { usePostStore } from "../store/usePostStore";
import useUserStore from "../store/userStore";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const NewPostForm = ({ isPostFormOpen, setIsPostFormOpen }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [postContent, setPostContent] = useState("");
  const { user } = useUserStore();
  const [filePreview, setFilePreview] = useState(null); // string (blob URL)
  const [selectedFile, setSelectedFile] = useState(null); // File
  const [loading, setLoading] = useState(false);
  const { handleCreatePost } = usePostStore();
  const [showImageUpload, setShowImageUpload] = useState(false);
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

  const handleEmojiClick = (emojiData) => {
    setPostContent((prev) => prev + (emojiData?.emoji || ""));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (filePreview) URL.revokeObjectURL(filePreview);

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setFilePreview(url);
    setShowImageUpload(true);
  };

  const handlePost = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("content", postContent.trim());
      if (selectedFile) formData.append("media", selectedFile);

      await handleCreatePost(formData);

      setPostContent("");
      clearFile();
      setIsPostFormOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isImage = selectedFile ? selectedFile.type.startsWith("image") : false;
  const isVideo = selectedFile ? selectedFile.type.startsWith("video") : false;

  const openFilePicker = () =>
    fileInputRef.current && fileInputRef.current.click();

  const canPost =
    !loading && (postContent.trim().length > 0 || Boolean(selectedFile));

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex space-x-4">
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

          <Dialog open={isPostFormOpen} onOpenChange={setIsPostFormOpen}>
            <DialogTrigger asChild>
              <div className="w-full cursor-pointer">
                <Input
                  placeholder={`What's on your mind? ${user?.username || ""}`}
                  readOnly
                  className="cursor-pointer rounded-full h-12 dark:bg-[rgb(58,59,60)] placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                <Separator className="my-2 dark:bg-slate-400" />
                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    className="flex items-center justify-center"
                    onClick={openFilePicker}
                  >
                    <ImageIcon className="h-5 w-5 mr-2 text-green-500" />
                    <span className="dark:text-white">Photo</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center justify-center"
                    onClick={openFilePicker}
                  >
                    <Video className="h-5 w-5 mr-2 text-red-500" />
                    <span className="dark:text-white">Video</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center justify-center"
                    onClick={() => setIsPostFormOpen(true)}
                  >
                    <Laugh className="h-5 w-5 mr-2 text-orange-500" />
                    <span className="dark:text-white">Feelings</span>
                  </Button>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-center">Create a post</DialogTitle>
              </DialogHeader>

              <Separator className="my-2" />

              <div className="flex items-center space-x-3 py-4">
                <Avatar className="h-10 w-10">
                  {user?.profilePicture ? (
                    <AvatarImage
                      src={user.profilePicture}
                      alt={user?.username || "User"}
                    />
                  ) : (
                    <AvatarFallback>{userPlaceholder}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-semibold">{user?.username || "User"}</p>
                </div>
              </div>

              <Textarea
                placeholder={`What's on your mind? ${user?.username || ""}`}
                className="min-h-[100px] text-lg"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />

              <AnimatePresence>
                {(showImageUpload || filePreview) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative mt-4 border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={clearFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    {filePreview && isImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="max-h-64 rounded-md object-contain"
                      />
                    )}

                    {filePreview && isVideo && (
                      <video
                        src={filePreview}
                        controls
                        className="max-h-64 rounded-md"
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {!filePreview && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative mt-4 border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer"
                  onClick={openFilePicker}
                >
                  <Plus className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-center text-gray-500">
                    Add Photos / Videos
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                </motion.div>
              )}

              <div className="bg-gray-200 dark:bg-muted p-4 rounded-lg mt-4">
                <p className="font-semibold mb-2">Add to your post</p>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={openFilePicker}
                  >
                    <ImageIcon className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={openFilePicker}
                  >
                    <Video className="h-4 w-4 text-red-500" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setShowEmojiPicker((v) => !v)}
                  >
                    <Laugh className="h-4 w-4 text-orange-500" />
                  </Button>
                </div>
              </div>

              <AnimatePresence>
                {showEmojiPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    className="relative mt-2"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => setShowEmojiPicker(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Picker onEmojiClick={handleEmojiClick} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-end mt-4">
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  onClick={handlePost}
                  disabled={!canPost}
                >
                  {loading ? "Posting..." : "Post"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewPostForm;
