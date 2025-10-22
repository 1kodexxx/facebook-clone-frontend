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
import { useState } from "react";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const NewPostForm = ({ isPostFormOpen, setIsPostFormOpen }) => {
  const [filePreview, setFilePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [postContent, setPostContent] = useState("");

  const handleEmojiClick = (emojiData) => {
    setPostContent((prev) => prev + emojiData.emoji);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFilePreview({
        url: URL.createObjectURL(file),
        type: file.type,
      });
    }
  };

  const removeFile = () => {
    setFilePreview(null);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <Avatar className="h-8 w-8">
            <AvatarImage />
            <AvatarFallback>D</AvatarFallback>
          </Avatar>

          {/* Диалог создания поста */}
          <Dialog open={isPostFormOpen} onOpenChange={setIsPostFormOpen}>
            <DialogTrigger asChild>
              <div className="w-full cursor-pointer">
                <Input
                  placeholder={`What's on your mind, Sasha Pushkin`}
                  readOnly
                  className="cursor-pointer rounded-full h-12 dark:bg-[rgb(58,59,60)] placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                <Separator className="my-2 dark:bg-slate-400" />
                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    className="flex items-center justify-center"
                  >
                    <ImageIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="dark:text-white">Photo</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center justify-center"
                  >
                    <Video className="h-5 w-5 text-red-500 mr-2" />
                    <span className="dark:text-white">Video</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center justify-center"
                  >
                    <Laugh className="h-5 w-5 text-orange-500 mr-2" />
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
                  <AvatarImage />
                  <AvatarFallback className="dark:bg-gray-400">
                    D
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Sasha Pushkin</p>
                </div>
              </div>

              <Textarea
                placeholder={`What's on your mind, Sasha Pushkin?`}
                className="min-h-[100px] text-lg"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />

              {/* Зона предпросмотра файла */}
              <AnimatePresence>
                {filePreview && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative mt-4 border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={removeFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    {filePreview.type.startsWith("image") ? (
                      <img
                        src={filePreview.url}
                        alt="Preview"
                        className="max-h-64 rounded-md object-contain"
                      />
                    ) : (
                      <video
                        src={filePreview.url}
                        controls
                        className="max-h-64 rounded-md"
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Если файл ещё не добавлен */}
              {!filePreview && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative mt-4 border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer"
                >
                  <Plus className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-center text-gray-500">
                    Add Photos / Videos
                  </p>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                </motion.div>
              )}

              {/* Блок действий */}
              <div className="bg-gray-200 dark:bg-muted p-4 rounded-lg mt-4">
                <p className="font-semibold mb-2">Add to your post</p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    onClick={() =>
                      document.querySelector('input[type="file"]')?.click()
                    }
                  >
                    <ImageIcon className="h-4 w-4 text-green-500 " />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Video className="h-4 w-4 text-red-500" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Laugh className="h-4 w-4 text-orange-500 " />
                  </Button>
                </div>
              </div>

              {/* Emoji Picker */}
              <AnimatePresence>
                {showEmojiPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="relative mt-2"
                  >
                    <Button
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

              {/* Кнопка публикации */}
              <div className="flex justify-end mt-4">
                <Button className="bg-blue-500 text-white hover:bg-blue-600">
                  Post
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
