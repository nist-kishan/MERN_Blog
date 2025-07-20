import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ReplyInput({ onSubmit }) {
  const [reply, setReply] = useState("");

  const handleSend = () => {
    if (reply.trim()) {
      onSubmit(reply.trim());
      setReply("");
    }
  };

  return (
    <div className="relative w-full mt-4">
      <textarea
        rows={3}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write a thoughtful reply..."
        className="w-full resize-none rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 pr-12 text-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 shadow-lg font-sans"
      />
      
      <motion.div
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-3 right-3 z-10"
      >
        <Send
          size={22}
          onClick={handleSend}
          className={`text-blue-400 hover:text-blue-500 cursor-pointer transition-colors duration-200 ${
            !reply.trim() && "opacity-50 pointer-events-none"
          }`}
        />
      </motion.div>
    </div>
  );
}
