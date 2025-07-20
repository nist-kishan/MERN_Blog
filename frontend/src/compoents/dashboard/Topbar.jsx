import { Plus, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("/create-blog");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between mb-6"
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
        Dashboard
      </h1>

      <div className="flex items-center gap-3">
        {/* Create Post Button */}
        <button
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 active:scale-95 transition cursor-pointer"
          onClick={handleCreatePost}
        >
          <Plus size={18} />
          <span>Create Post</span>
        </button>

        {/* Settings Button */}
        <button
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
        >
          <Settings size={20} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </motion.div>
  );
}
