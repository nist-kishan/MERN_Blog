import { useState } from "react";
import {
  MessageSquareReply,
  Trash,
  Pencil,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReplyInput from "./ReplyInput";

function Avatar({
  name = "User",
  src = "https://tse3.mm.bing.net/th/id/OIP.y568N1DNk6JeHsDtlu8nLQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return src ? (
    <img
      src={src}
      alt={`${name}'s avatar`}
      className="w-9 h-9 rounded-full object-cover border border-gray-300 dark:border-white/20"
    />
  ) : (
    <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
      {initials}
    </div>
  );
}

export default function CommentCard({
  comment,
  onReply,
  onDelete,
  onEdit,
  currentUser,
}) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [replyEditStates, setReplyEditStates] = useState({});

  const isAuthorOrAdmin = true; 
  // Replace with: currentUser?.id === comment.authorId || currentUser?.role === "admin";

  const handleReplySubmit = (text) => {
    if (!text.trim()) return;
    onReply(comment._id, text);
    setShowReplyInput(false);
  };

  const handleEditSubmit = () => {
    if (!editText.trim()) return;
    onEdit(comment._id, editText);
    setIsEditing(false);
  };

  const toggleReplyEdit = (replyId, text) => {
    setReplyEditStates((prev) => ({
      ...prev,
      [replyId]: { isEditing: true, text },
    }));
  };

  const handleReplyEditChange = (replyId, value) => {
    setReplyEditStates((prev) => ({
      ...prev,
      [replyId]: { ...prev[replyId], text: value },
    }));
  };

  const handleReplyEditSubmit = (replyId) => {
    const { text } = replyEditStates[replyId];
    if (text.trim()) {
      onEdit(replyId, text);
    }
    setReplyEditStates((prev) => ({
      ...prev,
      [replyId]: { isEditing: false, text: "" },
    }));
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
          <div className="flex justify-between items-start">
            <div>
              <span className="font-semibold">{comment.name}</span>
              {comment.createdAt && (
                <span className="ml-2 text-xs text-gray-500 dark:text-white/50">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              )}
            </div>

            {isAuthorOrAdmin && (
              <div className="flex items-center gap-2">
                <Pencil
                  size={16}
                  className="text-yellow-500 hover:text-yellow-700 cursor-pointer"
                  onClick={() => {
                    setIsEditing(true);
                    setEditText(comment.text);
                  }}
                  title="Edit comment"
                />
                <Trash
                  size={16}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => onDelete(comment._id)}
                  title="Delete comment"
                />
              </div>
            )}
          </div>

          {!isEditing ? (
            <p className="text-gray-700 dark:text-white/90">{comment.text}</p>
          ) : (
            <div className="flex flex-col gap-2 mt-1">
              <textarea
                className="bg-white/20 p-2 rounded-md text-sm w-full text-white"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleEditSubmit}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-xs bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 pt-1 text-xs font-medium">
            <div
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="flex items-center gap-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer"
              role="button"
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
                {comment.replies.map((reply, idx) => {
                  const replyEdit = replyEditStates[reply._id] || {
                    isEditing: false,
                    text: reply.text,
                  };

                  return (
                    <motion.div
                      key={reply._id || idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2, delay: idx * 0.03 }}
                      className="flex gap-3"
                    >
                      <Avatar name={reply.name} src={reply.avatar} />
                      <div className="bg-gray-100 dark:bg-white/10 backdrop-blur border border-gray-300 dark:border-white/10 rounded-xl p-3 w-full">
                        <div className="flex justify-between items-center text-sm font-semibold">
                          <span>{reply.name}</span>
                          {reply.createdAt && (
                            <span className="text-xs text-gray-500 dark:text-white/50">
                              {new Date(reply.createdAt).toLocaleString()}
                            </span>
                          )}
                        </div>

                        {!replyEdit.isEditing ? (
                          <div className="text-xs mt-1 text-gray-800 dark:text-white/80 flex justify-between">
                            <span>{reply.text}</span>
                            {isAuthorOrAdmin && (
                              <div className="flex gap-2 ml-4">
                                <Pencil
                                  size={14}
                                  className="text-yellow-500 hover:text-yellow-700 cursor-pointer"
                                  onClick={() =>
                                    toggleReplyEdit(reply._id, reply.text)
                                  }
                                />
                                <Trash
                                  size={14}
                                  className="text-red-500 hover:text-red-700 cursor-pointer"
                                  onClick={() => onDelete(reply._id)}
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2 mt-2">
                            <textarea
                              className="bg-white/20 p-2 rounded-md text-xs w-full text-white"
                              value={replyEdit.text}
                              onChange={(e) =>
                                handleReplyEditChange(reply._id, e.target.value)
                              }
                              rows={2}
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleReplyEditSubmit(reply._id)}
                                className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                              >
                                Save
                              </button>
                              <button
                                onClick={() =>
                                  setReplyEditStates((prev) => ({
                                    ...prev,
                                    [reply._id]: { isEditing: false, text: "" },
                                  }))
                                }
                                className="text-xs bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-2 py-1 rounded"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
