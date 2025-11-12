// === src/app/posts/PostCard.jsx ===
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import {
  Facebook,
  Linkedin,
  Link as LinkIcon,
  MessageCircle,
  MoreHorizontal,
  Share2,
  ThumbsUp,
  Twitter,
} from "lucide-react";
import { useMemo, useState } from "react";
import PostComments from "./PostComments";

const PostCard = ({ post, isLiked, onShare, onComment, onLike }) => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const userName = post?.user?.username || "Unknown user";

  const userPlaceholder = useMemo(() => {
    if (!userName) return "U";
    return userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [userName]);

  const createdAt = useMemo(() => {
    if (!post?.createdAt) return "";
    try {
      const d = new Date(post.createdAt);
      return d.toLocaleString();
    } catch {
      return String(post.createdAt);
    }
  }, [post?.createdAt]);

  const likeCount =
    typeof post?.likeCount === "number"
      ? post.likeCount
      : Array.isArray(post?.likes)
      ? post.likes.length
      : 0;

  const commentsCount = Array.isArray(post?.comments)
    ? post.comments.length
    : post?.commentCount || 0;

  const shareCount = typeof post?.shareCount === "number" ? post.shareCount : 0;

  const generateSharedLink = () => {
    // берём origin из браузера, иначе из ENV, иначе http://localhost:3000
    const origin =
      (typeof window !== "undefined" && window.location.origin) ||
      process.env.NEXT_PUBLIC_FRONTEND_ORIGIN ||
      "http://localhost:3000";
    return `${origin}/${post?._id}`;
  };

  const handleShare = (platform) => {
    const url = generateSharedLink();

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("✅ Link copied to clipboard!");
        setIsShareDialogOpen(false);
        break;
      default:
        break;
    }

    // опционально уведомляем родителя
    onShare && onShare(post?._id, platform);
  };

  const handleLike = () => {
    onLike && onLike(post?._id);
  };

  const handleCommentToggle = () => {
    setShowComments((v) => !v);
    if (!showComments) {
      onComment && onComment(post?._id);
    }
  };

  return (
    <motion.div
      key={post?._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="dark:bg-[rgb(36,37,38)] bg-white border border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          {/* Верхняя часть */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 cursor-pointer">
              <Avatar>
                {post?.user?.profilePicture ? (
                  <AvatarImage src={post.user.profilePicture} alt={userName} />
                ) : (
                  <AvatarFallback>{userPlaceholder}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {userName}
                </p>
                {!!createdAt && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {createdAt}
                  </p>
                )}
              </div>
            </div>
            <Button variant="ghost" className="dark:hover:bg-gray-600">
              <MoreHorizontal className="h-4 w-4 text-gray-600 dark:text-gray-200" />
            </Button>
          </div>

          {/* Контент */}
          {post?.content && (
            <p className="mb-4 text-gray-900 dark:text-gray-200">
              {post.content}
            </p>
          )}

          {post?.mediaUrl && post.mediaType === "image" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.mediaUrl}
              alt="post image"
              className="w-full h-auto rounded-lg mb-4"
            />
          )}

          {post?.mediaUrl && post.mediaType === "video" && (
            <video controls className="w-full h-[500px] rounded-lg mb-4">
              <source src={post.mediaUrl} type="video/mp4" />
              Your browser does not support the video tag
            </video>
          )}

          {/* Статистика */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-400 cursor-default">
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </span>
            <div className="flex gap-2">
              <span
                className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                onClick={handleCommentToggle}
              >
                {commentsCount} {commentsCount === 1 ? "comment" : "comments"}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 cursor-default">
                {shareCount} {shareCount === 1 ? "share" : "shares"}
              </span>
            </div>
          </div>

          <Separator className="mb-2 dark:bg-gray-500" />

          {/* Кнопки действий */}
          <div className="flex justify-between mb-2">
            <Button
              variant="ghost"
              className="flex-1 dark:hover:bg-gray-700"
              onClick={handleLike}
            >
              <ThumbsUp className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-200" />
              {isLiked ? "Liked" : "Like"}
            </Button>

            <Button
              variant="ghost"
              className="flex-1 dark:hover:bg-gray-700"
              onClick={handleCommentToggle}
            >
              <MessageCircle className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-200" />
              Comment
            </Button>

            {/* === Share Dialog === */}
            <Dialog
              open={isShareDialogOpen}
              onOpenChange={setIsShareDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex-1 dark:hover:bg-gray-700"
                >
                  <Share2 className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-200" />
                  Share
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[400px] p-6 rounded-xl dark:bg-[rgb(36,37,38)] bg-white border border-gray-2 00 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold mb-1">
                    Share This Post
                  </DialogTitle>
                  <DialogDescription className="text-sm mb-4 text-gray-500 dark:text-gray-400">
                    Choose how you want to share this post
                  </DialogDescription>
                </DialogHeader>

                {/* Кнопки Share */}
                <div className="flex flex-col space-y-3">
                  <Button
                    className="w-full bg-white dark:bg-gray-800 text-black dark:text-white font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
                    onClick={() => handleShare("facebook")}
                  >
                    <Facebook className="h-4 w-4" />
                    Share on Facebook
                  </Button>

                  <Button
                    className="w-full bg-white dark:bg-gray-800 text-black dark:text-white font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
                    onClick={() => handleShare("twitter")}
                  >
                    <Twitter className="h-4 w-4" />
                    Share on Twitter
                  </Button>

                  <Button
                    className="w-full bg-white dark:bg-gray-800 text-black dark:text-white font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
                    onClick={() => handleShare("linkedin")}
                  >
                    <Linkedin className="h-4 w-4" />
                    Share on Linkedin
                  </Button>

                  <Button
                    className="w-full bg-white dark:bg-gray-800 text-black dark:text-white font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
                    onClick={() => handleShare("copy")}
                  >
                    <LinkIcon className="h-4 w-4" />
                    Copy Link
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Separator className="mb-2 dark:bg-gray-500" />

          {/* Комментарии */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PostComments post={post} />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PostCard;
