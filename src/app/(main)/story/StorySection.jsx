"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePostStore } from "../store/usePostStore";
import StoryCard from "./StoryCard";

const CARD_W = 176; // ≈ w-44 + отступы на md
const GAP = 8;

export default function StorySection() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isSmUp, setIsSmUp] = useState(false); // drag только на >=sm
  const containerRef = useRef(null);

  const { story = [], fetchStoryPost } = usePostStore();

  useEffect(() => {
    fetchStoryPost();
  }, [fetchStoryPost]);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");
    const apply = () => setIsSmUp(mql.matches);
    apply();
    mql.addEventListener?.("change", apply);
    return () => mql.removeEventListener?.("change", apply);
  }, []);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const update = () => {
      const max = Math.max(0, c.scrollWidth - c.clientWidth);
      setMaxScroll(max);
      setScrollPosition(c.scrollLeft);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(c);
    window.addEventListener("resize", update, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [story.length]);

  const scroll = (dir) => {
    const c = containerRef.current;
    if (!c) return;
    const delta = (CARD_W + GAP) * 2 * (dir === "left" ? -1 : 1);
    c.scrollBy({ left: delta, behavior: "smooth" });
  };

  const handleScroll = () => {
    const c = containerRef.current;
    if (c) setScrollPosition(c.scrollLeft);
  };

  const visibleWidth = containerRef.current?.clientWidth || 0;
  const totalCards = (story?.length || 0) + 1;
  const dragLeftLimit = useMemo(() => {
    const fullWidth = totalCards * (CARD_W + GAP);
    const overflow = Math.max(0, fullWidth - visibleWidth);
    return -overflow;
  }, [totalCards, visibleWidth]);

  return (
    <div className="relative w-full overflow-x-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="
          flex space-x-2 overflow-x-auto py-3 sm:py-4 no-scrollbar
          px-3 sm:px-0 w-full
          [scrollbar-width:none] [-webkit-overflow-scrolling:touch]
        "
        style={{ msOverflowStyle: "none" }}
      >
        <motion.div
          className="flex space-x-2"
          drag={isSmUp ? "x" : false}
          dragConstraints={{ right: 0, left: dragLeftLimit }}
          dragElastic={0.08}
        >
          <StoryCard isAddStory />
          {story?.map((s) => (
            <StoryCard story={s} key={s._id} />
          ))}
        </motion.div>

        {/* стрелки показываем только ≥sm, чтобы не закрывать контент на мобиле */}
        {scrollPosition > 0 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg z-10 hidden sm:flex"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {scrollPosition < maxScroll && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg z-10 hidden sm:flex"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
          height: 0;
          width: 0;
        }
      `}</style>
    </div>
  );
}
