import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import CommentCard from "./CommentCard";

const baseURL = import.meta.env.VITE_API_BASE_URL;;
const currentUser = {
  name: "Kishan",
  id: "687ad47cc17de873a4e580e7",
};

export default function CommentSection({ id: blogId }) {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${baseURL}/comment/${blogId}`);
      setComments(response.data.data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const addComment = async () => {
    if (!commentInput.trim()) return;
    try {
      console.log(blogId)
      const res=await axios.post(`${baseURL}/comment`, {
        blog: blogId,
        user: currentUser.id,
        text: commentInput,
      });
      console.log(res)
      setCommentInput("");
      fetchComments();
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`${baseURL}/comment/${commentId}`);
      fetchComments();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const addReply = async (commentId, replyText) => {
    if (!replyText.trim()) return;
    try {
      await axios.post(`${baseURL}/comment`, {
        blog: blogId,
        user: currentUser.id,
        text: replyText,
        parent: commentId,
      });
      fetchComments();
    } catch (error) {
      console.error("Failed to add reply:", error);
    }
  };

  const editComment=async(commentId, editText)=>{
    // if (!replyText.trim()) return;
    try {
      const response=await axios.put(`${baseURL}/comment/${commentId}`,{text:editText});
      fetchComments();
    } catch (error) {
      console.error("Failed to Update Comments:", error);
    }
    
  }

  return (
    <motion.div
      className="w-full space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold tracking-tight text-white">
        Comments ({comments.length})
      </h2>

      <motion.div
        className="relative rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-4 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <textarea
          rows={3}
          className="w-full bg-transparent text-white text-sm resize-none placeholder:text-gray-400 focus:outline-none pr-10"
          placeholder="Write a comment..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <Send
          className="absolute bottom-4 right-4 text-blue-500 hover:text-blue-700 cursor-pointer transition"
          size={20}
          onClick={addComment}
        />
      </motion.div>

      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.07,
            },
          },
        }}
      >
        {comments.map((comment) => (
          <motion.div
            key={comment._id}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            <CommentCard
              comment={comment}
              onReply={addReply}
              onDelete={deleteComment}
              onEdit={editComment}
              currentUser={currentUser}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
