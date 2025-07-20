import { useState } from "react";
import {
  Bookmark,
  Trash2,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SavedBlogs() {
  const [savedBlogs, setSavedBlogs] = useState([
    {
      id: 1,
      title: "The Future of AI",
      author: "Kishan Raj",
      category: "Technology",
      likes: 102,
      dislikes: 3,
    },
    {
      id: 2,
      title: "Designing with Tailwind",
      author: "Sarah Doe",
      category: "Design",
      likes: 87,
      dislikes: 5,
    },
    {
      id: 3,
      title: "Node.js Backend Tips",
      author: "John Smith",
      category: "Programming",
      likes: 75,
      dislikes: 2,
    },
  ]);

  const handleDelete = (id) => {
    setSavedBlogs((prev) => prev.filter((blog) => blog.id !== id));
  };

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"
      >
        <Bookmark className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
        Saved Blogs
      </motion.h1>

      {/* Blog List */}
      {savedBlogs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No saved blogs.</p>
      ) : (
        <div className="grid gap-5">
          {savedBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-xl bg-white dark:bg-gray-900 shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    By {blog.author} • Category: <span className="font-medium">{blog.category}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400 items-center">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" /> {blog.likes}
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsDown className="w-4 h-4" /> {blog.dislikes}
                </span>
                <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 ml-auto cursor-pointer">
                  <Bookmark className="w-4 h-4" />
                  Saved
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
