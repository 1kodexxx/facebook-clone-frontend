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
  const userPlaceholder = useMemo(
    () =>
      userName
        ? userName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "U",
    [userName]
  );

  const createdAt = useMemo(() => {
    if (!post?.createdAt) return "";
    const d = new Date(post.createdAt);
    return isNaN(+d) ? String(post.createdAt) : d.toLocaleString();
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
    const origin =
      (typeof window !== "undefined" && window.location.origin) ||
      process.env.NEXT_PUBLIC_FRONTEND_ORIGIN ||
      "http://localhost:3000";
    return `${origin}/${post?._id ?? post?.id ?? ""}`;
  };

  const webShare = async (url) => {
    try {
      if (navigator.share) {
        await navigator.share({ url });
        return true;
      }
    } catch {
      /* ignore */
    }
    return false;
  };

  const handleShare = async (platform) => {
    const url = generateSharedLink();
    const u = encodeURIComponent(url);

    if (platform === "native" && (await webShare(url))) {
      onShare?.(post?._id, "native");
      setIsShareDialogOpen(false);
      return;
    }

    let shareUrl = null;
    if (platform === "facebook")
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    if (platform === "twitter")
      shareUrl = `https://twitter.com/intent/tweet?url=${u}`;
    if (platform === "linkedin")
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;

    if (platform === "copy") {
      await navigator.clipboard?.writeText(url);
      setIsShareDialogOpen(false);
      onShare?.(post?._id, "copy");
      return;
    }

    if (shareUrl) window.open(shareUrl, "_blank", "noopener,noreferrer");
    onShare?.(post?._id, platform);
  };

  return (
    <motion.div
      key={post?._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="dark:bg-[rgb(36,37,38)] bg-white border border-gray-200 dark:border-gray-700">
        <CardContent className="p-3 sm:p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-3">
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
            <Button
              variant="ghost"
              size="icon"
              className="dark:hover:bg-gray-600"
            >
              <MoreHorizontal className="h-4 w-4 text-gray-600 dark:text-gray-200" />
            </Button>
          </div>

          {/* Text */}
          {post?.content && (
            <p className="mb-3 sm:mb-4 text-gray-900 dark:text-gray-200 text-sm sm:text-base">
              {post.content}
            </p>
          )}

          {/* Media */}
          {post?.mediaUrl && post.mediaType === "image" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.mediaUrl}
              alt="post image"
              className="w-full h-auto rounded-lg mb-3 sm:mb-4 max-h-[70vh] object-contain"
            />
          )}

          {post?.mediaUrl && post.mediaType === "video" && (
            <video
              controls
              className="w-full rounded-lg mb-3 sm:mb-4 h-[56vw] sm:h-[360px] md:h-[420px] lg:h-[500px]"
            >
              <source src={post.mediaUrl} type="video/mp4" />
              Your browser does not support the video tag
            </video>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </span>
            <div className="flex gap-2 text-xs sm:text-sm">
              <span
                className="text-gray-600 dark:text-gray-400 cursor-pointer"
                onClick={() => setShowComments((v) => !v)}
              >
                {commentsCount} {commentsCount === 1 ? "comment" : "comments"}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {shareCount} {shareCount === 1 ? "share" : "shares"}
              </span>
            </div>
          </div>

          <Separator className="mb-2 dark:bg-gray-500" />

          {/* Actions */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-2">
            <Button
              variant="ghost"
              className="w-full dark:hover:bg-gray-700 py-2 sm:py-2.5"
              onClick={() => onLike?.(post?._id)}
            >
              <ThumbsUp className="mr-1.5 sm:mr-2 h-4 w-4 text-gray-700 dark:text-gray-200" />
              {isLiked ? "Liked" : "Like"}
            </Button>

            <Button
              variant="ghost"
              className="w-full dark:hover:bg-gray-700 py-2 sm:py-2.5"
              onClick={() => setShowComments((v) => !v)}
            >
              <MessageCircle className="mr-1.5 sm:mr-2 h-4 w-4 text-gray-700 dark:text-gray-200" />
              Comment
            </Button>

            <Dialog
              open={isShareDialogOpen}
              onOpenChange={setIsShareDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full dark:hover:bg-gray-700 py-2 sm:py-2.5"
                >
                  <Share2 className="mr-1.5 sm:mr-2 h-4 w-4 text-gray-700 dark:text-gray-200" />
                  Share
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[400px] w-[92vw] sm:w-auto p-4 sm:p-6 rounded-xl dark:bg-[rgb(36,37,38)] bg-white border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold mb-1">
                    Share This Post
                  </DialogTitle>
                  <DialogDescription className="text-sm mb-4 text-gray-500 dark:text-gray-400">
                    Choose how you want to share this post
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col space-y-3">
                  <Button
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => handleShare("native")}
                  >
                    <Share2 className="h-4 w-4" />
                    Share via device
                  </Button>
                  <Button
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => handleShare("facebook")}
                  >
                    <Facebook className="h-4 w-4" /> Facebook
                  </Button>
                  <Button
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => handleShare("twitter")}
                  >
                    <Twitter className="h-4 w-4" /> Twitter
                  </Button>
                  <Button
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => handleShare("linkedin")}
                  >
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </Button>
                  <Button
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => handleShare("copy")}
                  >
                    <LinkIcon className="h-4 w-4" /> Copy Link
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Separator className="mb-2 dark:bg-gray-500" />

          {/* Comments */}
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
