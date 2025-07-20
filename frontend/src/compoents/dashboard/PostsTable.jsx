import { motion } from "framer-motion";

export default function PostsTable() {
  const posts = [
    { title: "Building with React", author: "Kishan", status: "Published", date: "July 17, 2025" },
    { title: "Understanding Tailwind", author: "Ravi", status: "Draft", date: "July 16, 2025" },
    { title: "Next.js vs Vite", author: "Anjali", status: "Published", date: "July 15, 2025" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 ring-1 ring-gray-200 dark:ring-gray-700"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">📄 Recent Posts</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-y-2">
          <thead className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            <tr>
              <th className="py-2 text-left">Title</th>
              <th className="py-2 text-left">Author</th>
              <th className="py-2 text-left">Status</th>
              <th className="py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 dark:text-gray-300">
            {posts.map((post, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 rounded-md cursor-pointer shadow-sm"
              >
                <td className="py-3 px-4 rounded-l-md">{post.title}</td>
                <td className="px-4">{post.author}</td>
                <td className="px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${
                        post.status === "Published"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-4 rounded-r-md">{post.date}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
