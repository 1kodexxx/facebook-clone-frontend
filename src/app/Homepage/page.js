"use client";
import { useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import NewPostForm from "../posts/NewPostForm";
import PostCard from "../posts/PostCard";
import StorySection from "../story/StorySection";

export default function Page() {
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const posts = [
    {
      _id: 1,
      content: "hello world",
      mediaUrl:
        "https://images.unsplash.com/photo-1760895986008-0a016173836c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
      mediaType: "image",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex flex-1 pt-16">
        <LeftSideBar />
        <div className="flex-1 px-4 py-6 md:ml-64 ld:mr-64 lg:max-w-2xl xl:max-w-3xl mx-auto">
          <div className="lg:ml-2 xl:ml-28">
            <StorySection />
            <NewPostForm
              isPostFormOpen={isPostFormOpen}
              setIsPostFormOpen={setIsPostFormOpen}
            />
            <div className="mt-6 space-y-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-64 xl:w-80 fixed right-0 top-16 bottom-0 overflow-y-auto p-4">
          <RightSideBar />
        </div>
      </main>
    </div>
  );
}
