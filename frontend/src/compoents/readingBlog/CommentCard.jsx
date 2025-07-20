import { useState } from "react";
import { MessageSquareReply, Trash, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReplyInput from "./ReplyInput";

function Avatar({ name, src }) {
  return src ? (
    <img
      src={src}
      alt={name}
      className="w-9 h-9 rounded-full object-cover border border-gray-300 dark:border-white/20"
    />
  ) : (
    <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
      {name?.[0]?.toUpperCase() || "U"}
    </div>
  );
}

export default function CommentCard({ comment, onReply, onDelete, currentUser }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const isAuthorOrAdmin =
    currentUser?.id === comment.authorId || currentUser?.role === "admin";

  const handleReplySubmit = (text) => {
    onReply(comment.id, text);
    setShowReplyInput(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-100 dark:bg-white/10 backdrop-blur-lg border border-gray-300 dark:border-white/20 rounded-2xl p-4 text-sm text-gray-800 dark:text-white shadow-md w-full"
    >
      <div className="flex gap-3 items-start">
        <Avatar name={comment.name} src={comment.avatar} />

        <div className="flex-1 space-y-1">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold">{comment.name}</span>
              {comment.createdAt && (
                <span className="ml-2 text-xs text-gray-500 dark:text-white/50">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              )}
            </div>

            {isAuthorOrAdmin && (
              <Trash
                size={18}
                className="text-red-500 hover:text-red-700 cursor-pointer"
                onClick={() => onDelete(comment.id)}
              />
            )}
          </div>

          <p className="text-gray-700 dark:text-white/90">{comment.text}</p>

          <div className="flex items-center gap-4 pt-1 text-xs font-medium">
            <div
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="flex items-center gap-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer"
            >
              <MessageSquareReply size={14} />
              <span>Reply</span>
            </div>

            {comment.replies?.length > 0 && (
              <div
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center gap-1 text-gray-600 dark:text-white/70 hover:text-black dark:hover:text-white cursor-pointer"
              >
                {showReplies ? (
                  <>
                    <ChevronUp size={14} />
                    <span>Hide Replies</span>
                  </>
                ) : (
                  <>
                    <ChevronDown size={14} />
                    <span>Show Replies ({comment.replies.length})</span>
                  </>
                )}
              </div>
            )}
          </div>

          <AnimatePresence>
            {showReplyInput && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-2"
              >
                <ReplyInput onSubmit={handleReplySubmit} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showReplies && comment.replies?.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 space-y-3 pl-5 border-l-2 border-gray-300 dark:border-white/10"
              >
                {comment.replies.map((reply, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    className="flex gap-3"
                  >
                    <Avatar name={reply.name} src={reply.avatar} />
                    <div className="bg-gray-100 dark:bg-white/10 backdrop-blur border border-gray-300 dark:border-white/10 rounded-xl p-3 w-full">
                      <div className="font-semibold text-sm">{reply.name}</div>
                      <p className="text-gray-800 dark:text-white/80 text-xs mt-1">{reply.text}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
