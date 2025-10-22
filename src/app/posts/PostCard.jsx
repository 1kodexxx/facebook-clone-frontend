import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import { MessageCircle, MoreHorizontal, Share2, ThumbsUp } from "lucide-react";
import { useState } from "react";

const PostCard = ({ post }) => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  return (
    <motion.div
      key={post?._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 cursor-pointer">
              <Avatar>
                <AvatarImage />
                <AvatarFallback className="bg-gray-300 dark:bg-gray-600">
                  D
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-sembibold dark:text-white">Sasha Pushkin</p>
                <p className="font-sm text-gray-500">20-05-2024</p>
              </div>
            </div>
            <Button variant="ghost" className="dark:hover:bg-gray-500">
              <MoreHorizontal className="dark:text-white h-4 w-4" />
            </Button>
          </div>
          <p className="mb-4">{post?.content}</p>
          {post?.mediaUrl && post.mediaType === "image" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post?.mediaUrl}
              alt="post image"
              className="w-full h-auto rounded-lg mb-4"
            />
          )}

          {post?.mediaUrl && post.mediaType === "video" && (
            <video controls className="w-full h-[500px] rounded-lg mb-4">
              <source src={post?.mediaUrl} type="video/mp4" />
              Your browser does not support the video tag
            </video>
          )}

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 hover:border-b-1 border-gray-200 cursor-pointer">
              2 likes
            </span>
            <div className="flex gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 hover:border-b-1 border-gray-200 cursor-pointer">
                3 comments
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 hover:border-b-1 border-gray-200 cursor-pointer">
                3 share
              </span>
            </div>
          </div>
          <Separator className="mb-2 dark:bg-gray-400" />
          <div className="flex justify-between mb-2">
            <Button variant="ghost" className={`flex dark:hover-bg-gray-600`}>
              <ThumbsUp className="mr-2 h-4 w-4" /> Like
            </Button>{" "}
            <Button variant="ghost" className={`flex dark:hover-bg-gray-600`}>
              <MessageCircle className="mr-2 h-4 w-4" /> Comment
            </Button>{" "}
            <Dialog
              open={isShareDialogOpen}
              onOpenChange={setIsShareDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex-1 dark:hover:bg-gray-500"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share this post</DialogTitle>
                  <DialogDescription>
                    Choose how you want to share this post
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                  <Button onClick={() => handleShare("facebook")}>
                    Share on Facebook
                  </Button>{" "}
                  <Button onClick={() => handleShare("twitter")}>
                    Share on Twitter
                  </Button>{" "}
                  <Button onClick={() => handleShare("linkedin")}>
                    Share on Linkedin
                  </Button>
                  <Button onClick={() => handleShare("copy")}>Copy Link</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Separator className="mb-2 dark:bg-gray-400" />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PostCard;
