"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import { useMemo, useState } from "react";
// поправь путь к стору, если другой
import useUserStore from "../../store/useUserStore";

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase() || "U";

const fmtDate = (v) => {
  const d = new Date(v);
  return isNaN(+d) ? String(v ?? "") : d.toLocaleString();
};

const PostComments = ({ post, onAddComment }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { user } = useUserStore();

  const comments = useMemo(() => post?.comments || [], [post?.comments]);
  const visible = showAllComments ? comments : comments.slice(0, 3);

  const currentName = user?.username || "User";
  const currentAvatar = user?.profilePicture || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = newComment.trim();
    if (!text || !post?._id || !onAddComment) return;

    try {
      setSubmitting(true);
      await onAddComment(post._id, text);
      setNewComment("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-100 text-sm sm:text-base">
        Comments
      </h3>

      {/* список комментариев */}
      <div className="max-h-60 overflow-y-auto pr-2 space-y-3">
        {visible.map((c, i) => {
          const name = c?.user?.username || "User";
          return (
            <div
              key={c?._id || `${i}-${c?.createdAt || ""}`}
              className="flex items-start space-x-3 text-gray-900 dark:text-gray-100"
            >
              <Avatar className="h-8 w-8 flex-shrink-0 mt-[2px]">
                {c?.user?.profilePicture ? (
                  <AvatarImage src={c.user.profilePicture} alt={name} />
                ) : (
                  <AvatarFallback className="bg-gray-600 text-white text-sm">
                    {initials(name)}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="flex-1">
                <div className="bg-[#f0f2f5] dark:bg-[#1a1d29] hover:bg-[#e6e7eb] dark:hover:bg-[#232634] rounded-lg p-2 transition-colors duration-150">
                  <p className="font-semibold text-xs sm:text-sm mb-[2px] leading-tight">
                    {name}
                  </p>
                  <p className="text-xs sm:text-sm leading-snug">
                    {c?.text || ""}
                  </p>
                </div>

                <div className="flex items-center mt-1 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-1 h-auto text-[11px] sm:text-xs hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Like
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-1 h-auto text-[11px] sm:text-xs hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Reply
                  </Button>
                  <span>{fmtDate(c?.createdAt)}</span>
                </div>
              </div>
            </div>
          );
        })}

        {comments.length > 3 && (
          <button
            onClick={() => setShowAllComments((v) => !v)}
            className="flex items-center text-blue-600 dark:text-blue-400 mt-1 text-sm font-medium hover:underline"
          >
            {showAllComments ? (
              <>
                Show less <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Show all comments <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>

      {/* поле ввода как на скриншоте */}
      <form
        onSubmit={handleSubmit}
        className="mt-3 flex items-center space-x-2"
      >
        <Avatar className="h-8 w-8 flex-shrink-0">
          {currentAvatar ? (
            <AvatarImage src={currentAvatar} alt={currentName} />
          ) : (
            <AvatarFallback className="bg-gray-600 text-white text-sm">
              {initials(currentName)}
            </AvatarFallback>
          )}
        </Avatar>

        <div className="flex-1 flex items-center bg-[#242526] dark:bg-[#242526] rounded-full px-3 py-1.5">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-100 placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={!newComment.trim() || submitting}
            className="ml-2 text-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostComments;
