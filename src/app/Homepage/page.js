"use client";

import { useEffect, useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import NewPostForm from "../posts/NewPostForm";
import PostCard from "../posts/PostCard";
import { usePostStore } from "../store/usePostStore";
import StorySection from "../story/StorySection";
// если используешь toast — не забудь импорт
// import { toast } from "react-hot-toast";

export default function Page() {
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [likePosts, setLikePosts] = useState(new Set());

  const {
    posts,
    fetchPost,
    handleCreatePost,
    handleCommentPost,
    handleLikePost,
  } = usePostStore();

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    const saved = localStorage.getItem("likePosts");
    if (saved) setLikePosts(new Set(JSON.parse(saved)));
  }, []);

  const handleLike = async (postId) => {
    const updated = new Set(likePosts);
    if (updated.has(postId)) {
      updated.delete(postId);
      // toast?.error?.("Post disliked successfully");
    } else {
      updated.add(postId);
      // toast?.success?.("Like post successfully");
    }
    setLikePosts(updated);
    localStorage.setItem("likePosts", JSON.stringify([...updated]));
    try {
      await handleLikePost(postId);
      await fetchPost();
    } catch (e) {
      console.error(e);
      // toast?.error?.("Failed to like or unlike the post");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <main className="flex flex-1 pt-16 overflow-x-hidden">
        <LeftSideBar />

        {/* Центральная колонка */}
        <div className="flex-1 px-3 sm:px-4 py-6 md:ml-64 lg:mr-64 max-w-full">
          {/* Контейнер с хард-лимитом по ширине, чтобы ничего не распирало */}
          <div className="w-full mx-auto max-w-[100vw] sm:max-w-2xl xl:max-w-3xl">
            <StorySection />

            <NewPostForm
              isPostFormOpen={isPostFormOpen}
              setIsPostFormOpen={setIsPostFormOpen}
            />

            <div className="mt-6 space-y-6">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  isLiked={likePosts.has(post?._id)}
                  onLike={() => handleLike(post?._id)}
                  onComment={async (comment) => {
                    await handleCommentPost(post?._id, comment.text);
                    await fetchPost();
                  }}
                  // onShare={async () => { await handleSharePost(post?._id); }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Правая колонка (прячем до lg) */}
        <div className="hidden lg:block lg:w-64 xl:w-80 fixed right-0 top-16 bottom-0 overflow-y-auto p-4">
          <RightSideBar />
        </div>
      </main>
    </div>
  );
}
