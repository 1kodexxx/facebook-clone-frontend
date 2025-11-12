"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePostStore } from "../store/usePostStore";
import StoryCard from "./StoryCard";

const StorySection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef(null);

  const { story = [], fetchStoryPost } = usePostStore();

  // первичная загрузка
  useEffect(() => {
    fetchStoryPost();
  }, [fetchStoryPost]);

  // пересчёт максимального скролла и listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateMaxScroll = () => {
      const max = Math.max(0, container.scrollWidth - container.offsetWidth);
      setMaxScroll(max);
      setScrollPosition(container.scrollLeft);
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, [story]);

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = direction === "left" ? -240 : 240;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) setScrollPosition(container.scrollLeft);
  };

  const totalCards = (story?.length || 0) + 1; // +1 за "Create Story"
  const visibleWidth = containerRef.current?.offsetWidth || 0;
  const dragLeftLimit = -Math.max(0, totalCards * 200 - visibleWidth);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex space-x-2 overflow-x-auto py-4 no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <motion.div
          className="flex space-x-2"
          drag="x"
          dragConstraints={{ right: 0, left: dragLeftLimit }}
          dragElastic={0.08}
        >
          <StoryCard isAddStory />
          {story?.map((s) => (
            <StoryCard story={s} key={s._id} />
          ))}
        </motion.div>

        {/* Левая стрелка */}
        {scrollPosition > 0 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg z-10"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Правая стрелка */}
        {scrollPosition < maxScroll && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg z-10"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* скрываем нативный скроллбар в Safari/Chrome */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default StorySection;
