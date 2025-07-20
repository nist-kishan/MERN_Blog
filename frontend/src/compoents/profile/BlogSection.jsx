import { motion } from "framer-motion";

export default function BlogSection({ title }) {
  const dummyBlogs = Array.from({ length: 3 }).map((_, i) => ({
    id: i,
    title: `${title} Blog Title ${i + 1}`,
    date: new Date().toLocaleDateString(),
  }));

  return (
    <div className="mb-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 tracking-tight">
        {title}
      </h3>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dummyBlogs.map((blog, index) => (
          <motion.li
            key={blog.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-xl transition-all duration-300 p-4"
          >
            <div className="text-lg font-semibold text-gray-800 dark:text-white mb-1 line-clamp-2">
              {blog.title}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{blog.date}</div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
