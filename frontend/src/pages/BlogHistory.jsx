import { motion } from "framer-motion";
import { CalendarDays, Eye, MessageSquareText } from "lucide-react";

const dummyHistory = [
  {
    id: 1,
    title: "The Rise of AI in Daily Life",
    viewedAt: "2025-07-17 10:45 AM",
    description: "Exploring how artificial intelligence is changing our routines.",
    views: 120,
    comments: 18,
  },
  {
    id: 2,
    title: "Mastering React Query",
    viewedAt: "2025-07-16 04:22 PM",
    description: "Learn data fetching in React like a pro.",
    views: 98,
    comments: 7,
  },
  {
    id: 3,
    title: "Why Dark Mode is Loved by Developers",
    viewedAt: "2025-07-15 08:10 PM",
    description: "Dark mode is more than just aesthetic—here’s why.",
    views: 67,
    comments: 12,
  },
];

export default function BlogHistory() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400"
      >
        📜 Blog Viewing History
      </motion.h2>

      <div className="space-y-4">
        {dummyHistory.map((blog) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: blog.id * 0.05 }}
            className="bg-white dark:bg-[#1f232b] rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
              <CalendarDays size={14} />
              Viewed on {blog.viewedAt}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {blog.description}
            </p>
            <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Eye size={16} /> {blog.views} Views
              </span>
              <span className="flex items-center gap-1">
                <MessageSquareText size={16} /> {blog.comments} Comments
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
