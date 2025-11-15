"use client";

const { useRouter } = require("next/router");
const { default: LeftSideBar } = require("../../components/layout/LeftSideBar");
const { Button } = require("@/components/ui/button");

import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { usePostStore } from "../store/usePostStore";
import VideoCard from "./VideoCard";

const Page = () => {
  // Локальное состоянгие лайкнутых постов (id-шники в Set)
  const [likePosts, setLikePosts] = useState(new Set());

  // Посты и экшены из zustand стора
  const {
    posts = [],
    fetchPost,
    handleLikePost,
    handleCommentPost,
    handleSharePost,
  } = usePostStore();

  const router = useRouter();

  // Грузим посты при монтировании страницы
  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  // Восстанавливаем лайки из localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedLikes = localStorage.getItem("likePosts");
    if (savedLikes) {
      setLikePosts(new Set(JSON.parse(savedLikes)));
    }
  }, []);

  // Лайк / Дизлайк поста
  const handleLike = async (postId) => {
    const updatedLikePost = new Set(likePosts);

    if (updatedLikePost.has(postId)) {
      updatedLikePost.delete(postId);
      toast.error("Post disliked successfully");
    } else {
      updatedLikePost.add(postId);
      toast.success("Post liked successfully");
    }

    setLikePosts(updatedLikePost);

    if (typeof window !== "undefined") {
      localeStorage.setItem(
        "likePosts",
        JSON.stringify(Array.from(updatedLikePost))
      );
    }

    try {
      await handleLikePost(postId);
      await fetchPost();
    } catch (error) {
      console.error(error);
      toast.error("Failed to like or unlike the post");
    }
  };

  // Назад к основному фиду
  const handleBack = () => {
    router.push("/");
  };

  // Фильтруем только видеопосты
  const videoPosts = Array.isArray(posts)
    ? posts.filter((post) => post.mediaType === "video")
    : [];

  return (
    <div className="mt-12 min-h-screen">
      <LeftSideBar />
      <main className="ml-0 md:ml-64 p-6">
        {/* Кнопка назад */}
        <Button variant="ghost" className="mb-4" onClick={handleBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to feed
        </Button>

        {/* Список видеокарточек */}
        <div className="max-w-3xl mx-auto">
          {videoPosts.map((post) => (
            <VideoCard
              key={post?._id}
              post={post}
              isLiked={likePosts.has(post?._id)}
              onLike={() => handleLike(post?._id)}
              onComment={async ({ text }) => {
                await handleCommentPost(post?._id, text);
                await fetchPost();
              }}
              onShare={async () => {
                await handleSharePost(post?._id);
                await fetchPost();
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Page;
