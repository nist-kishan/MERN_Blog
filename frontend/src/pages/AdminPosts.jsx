import { useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";

const dummyPosts = [
  {
    id: "1",
    title: "Mastering React in 2025",
    author: "Kishan Raj",
    category: "Frontend",
    status: "Published",
    date: "2025-07-18",
  },
  {
    id: "2",
    title: "Understanding JWT Auth",
    author: "Kishan Raj",
    category: "Backend",
    status: "Draft",
    date: "2025-07-15",
  },
  {
    id: "3",
    title: "How to Build a Blog App",
    author: "Kishan Raj",
    category: "Fullstack",
    status: "Archived",
    date: "2025-06-30",
  },
];

export default function AdminPosts() {
  const [posts, setPosts] = useState(dummyPosts);

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        📋 All Blog Posts (Admin)
      </h2>

      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No posts available.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-[#1e222a] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl p-5 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {post.title}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    post.status === "Published"
                      ? "bg-green-100 text-green-600 dark:bg-green-900/20"
                      : post.status === "Draft"
                      ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20"
                      : "bg-red-100 text-red-600 dark:bg-red-900/20"
                  }`}
                >
                  {post.status}
                </span>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                👤 {post.author} · 📅 {post.date} · 🏷️ {post.category}
              </p>

              <div className="flex justify-end gap-3">
                <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  <Eye size={18} />
                </button>
                <button className="text-yellow-600 dark:text-yellow-400 hover:underline text-sm">
                  <Pencil size={18} />
                </button>
                <button
                  className="text-red-600 dark:text-red-400 hover:underline text-sm"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
