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
import { useEffect, useMemo, useRef, useState } from "react";
import { usePostStore } from "../../store/usePostStore";
import useUserStore from "../../store/useUserStore";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const MAX_IMAGE_MB = 8;
const MAX_VIDEO_MB = 64;

const NewPostForm = ({ isPostFormOpen, setIsPostFormOpen }) => {
  const { user } = useUserStore();
  const { handleCreatePost } = usePostStore();

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  const userPlaceholder = useMemo(
    () =>
      user?.username
        ?.split(" ")
        .map((n) => n[0])
        .join("") || "U",
    [user?.username]
  );

  const isImage = selectedFile?.type?.startsWith("image") ?? false;
  const isVideo = selectedFile?.type?.startsWith("video") ?? false;

  const openFilePicker = () => fileInputRef.current?.click();

  const clearFile = () => {
    if (filePreview?.startsWith?.("blob:")) URL.revokeObjectURL(filePreview);
    setSelectedFile(null);
    setFilePreview(null);
    setShowImageUpload(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (!isPostFormOpen) {
      setShowEmojiPicker(false);
      clearFile();
      setPostContent("");
      setError("");
    }
  }, [isPostFormOpen]); // eslint-disable-line

  const validateFile = (file) => {
    if (!file) return "No file";
    const mb = file.size / (1024 * 1024);
    if (file.type.startsWith("image") && mb > MAX_IMAGE_MB)
      return `Image is too large (>${MAX_IMAGE_MB}MB)`;
    if (file.type.startsWith("video") && mb > MAX_VIDEO_MB)
      return `Video is too large (>${MAX_VIDEO_MB}MB)`;
    if (!/^image|video\//.test(file.type)) return "Unsupported file type";
    return "";
  };

  const attachFile = (file) => {
    const err = validateFile(file);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    if (filePreview?.startsWith?.("blob:")) URL.revokeObjectURL(filePreview);
    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setFilePreview(url);
    setShowImageUpload(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    attachFile(file);
  };

  // DnD + paste
  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) attachFile(file);
  };

  const onPaste = (e) => {
    const item = [...(e.clipboardData?.items || [])].find((i) =>
      /^image\//.test(i.type)
    );
    if (item) {
      const file = item.getAsFile();
      if (file) attachFile(file);
    }
  };

  const handleEmojiClick = (emojiData) =>
    setPostContent((prev) => prev + (emojiData?.emoji || ""));

  const canPost = !loading && (postContent.trim() || selectedFile);

  const handlePost = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("content", postContent.trim());
      if (selectedFile) formData.append("media", selectedFile);
      await handleCreatePost(formData);
      setIsPostFormOpen(false);
      clearFile();
      setPostContent("");
    } catch (err) {
      console.error(err);
      setError("Failed to publish the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-3 sm:p-4">
        <div className="flex space-x-3 sm:space-x-4">
          <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
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
                  className="cursor-pointer rounded-full h-11 sm:h-12 dark:bg-[rgb(58,59,60)] placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />

                <Separator className="my-2 dark:bg-slate-400" />

                {/* Адаптивный ряд действий. На мобиле — только иконки. */}
                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                  <Button
                    variant="ghost"
                    onClick={openFilePicker}
                    className="flex-1 min-w-0 justify-center h-9 px-2"
                  >
                    <ImageIcon className="h-5 w-5 sm:mr-2" />
                    <span className="hidden sm:inline dark:text-white">
                      Photo
                    </span>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={openFilePicker}
                    className="flex-1 min-w-0 justify-center h-9 px-2"
                  >
                    <Video className="h-5 w-5 sm:mr-2" />
                    <span className="hidden sm:inline dark:text-white">
                      Video
                    </span>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => setShowEmojiPicker(true)}
                    className="flex-1 min-w-0 justify-center h-9 px-2"
                  >
                    <Laugh className="h-5 w-5 sm:mr-2" />
                    <span className="hidden sm:inline dark:text-white">
                      Feelings
                    </span>
                  </Button>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[525px] w-[92vw] sm:w-auto max-h-[80vh] overflow-y-auto">
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
                className="min-h-[92px] sm:min-h-[110px] text-base sm:text-lg"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                onPaste={onPaste}
              />

              {/* Preview / Drop zone */}
              <AnimatePresence>
                {(showImageUpload || filePreview) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative mt-4 border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={clearFile}
                      aria-label="Remove file"
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
                  className="relative mt-4 border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer"
                  onClick={openFilePicker}
                  onDrop={onDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <Plus className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-center text-gray-500">
                    Add Photos / Videos (drop or paste)
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

              {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

              <div className="bg-gray-200 dark:bg-muted p-3 sm:p-4 rounded-lg mt-4">
                <p className="font-semibold mb-2">Add to your post</p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={openFilePicker}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={openFilePicker}
                  >
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setShowEmojiPicker((v) => !v)}
                  >
                    <Laugh className="h-4 w-4" />
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
                      aria-label="Close emoji picker"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Picker onEmojiClick={(_, e) => handleEmojiClick(e)} />
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
