import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import CommentCard from "./CommentCard";

export default function CommentSection({ comment }) {

  // const [comments, setComments] = useState(allComments);
  // const [commentInput, setCommentInput] = useState("");

  // const addComment = () => {
  //   if (!commentInput.trim()) return;
  //   const newComment = {
  //     id: comments.length + 1,
  //     name: currentUser?.name || "You",
  //     text: commentInput,
  //     authorId: currentUser?.id,
  //     replies: [],
  //   };
  //   setComments([newComment, ...comments]);
  //   setCommentInput("");
  // };

  // const deleteComment = (id) => {
  //   setComments((prev) => prev.filter((c) => c.id !== id));
  // };

  // const addReply = (id, replyText) => {
  //   if (!replyText.trim()) return;
  //   const updated = comments.map((c) =>
  //     c.id === id
  //       ? {
  //           ...c,
  //           replies: [...c.replies, { name: currentUser.name, text: replyText }],
  //         }
  //       : c
  //   );
  //   setComments(updated);
  // };

  return (<>{JSON.stringify(comment)}</>
    // <motion.div
    //   className="w-full space-y-6"
    //   initial={{ opacity: 0, y: 30 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.4 }}
    // >
    //   <h2 className="text-2xl font-bold tracking-tight text-white">Comments ({comments.length})</h2>

    //   {/* Add Comment */}
    //   <motion.div
    //     className="relative rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-4 shadow-xl"
    //     initial={{ opacity: 0, y: 20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ delay: 0.1 }}
    //   >
    //     <textarea
    //       rows={3}
    //       className="w-full bg-transparent text-white text-sm resize-none placeholder:text-gray-400 focus:outline-none pr-10"
    //       placeholder="Write a comment..."
    //       value={commentInput}
    //       onChange={(e) => setCommentInput(e.target.value)}
    //     />
    //     <Send
    //       className="absolute bottom-4 right-4 text-blue-500 hover:text-blue-700 cursor-pointer transition"
    //       size={20}
    //       onClick={addComment}
    //     />
    //   </motion.div>

    //   {/* Comments */}
    //   <motion.div
    //     className="space-y-4"
    //     initial="hidden"
    //     animate="visible"
    //     variants={{
    //       hidden: {},
    //       visible: {
    //         transition: {
    //           staggerChildren: 0.07,
    //         },
    //       },
    //     }}
    //   >
    //     {comments.map((comment, index) => (
    //       <motion.div
    //         key={comment.id}
    //         variants={{
    //           hidden: { opacity: 0, y: 10 },
    //           visible: { opacity: 1, y: 0 },
    //         }}
    //         transition={{ duration: 0.3 }}
    //       >
    //         <CommentCard
    //           comment={comment}
    //           onReply={addReply}
    //           onDelete={deleteComment}
    //           currentUser={currentUser}
    //         />
    //       </motion.div>
    //     ))}
    //   </motion.div>
    // </motion.div>
  );
}
