import { motion } from "framer-motion";
import { Info } from "lucide-react";

export default function Page1({ formData, setFormData }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-10 bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-2xl shadow-xl ring-1 ring-gray-200 dark:ring-gray-700"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-extrabold text-gray-800 dark:text-white"
        >
          🚀 Start Your Blog Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          Begin by adding a title and choosing a suitable category.
        </motion.p>
      </div>

      {/* Blog Title */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <div className="space-y-1">
          <label className="block text-gray-700 dark:text-gray-300 font-medium">
            Blog Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., How I Built My Own SaaS App"
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            required
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <Info size={14} /> This is the first thing readers will see. Make it catchy!
        </p>
      </motion.div>

      {/* Blog Category */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <div className="space-y-1">
          <label className="block text-gray-700 dark:text-gray-300 font-medium">
            Blog Category
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="e.g., Web Development, AI, Productivity"
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
            required
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <Info size={14} /> Used to group and filter similar content.
        </p>
      </motion.div>

      {/* Pro Tip Box */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-violet-50 to-purple-100 dark:from-violet-900 dark:to-purple-800 border border-purple-300 dark:border-purple-600 rounded-xl p-5 shadow-lg"
      >
        <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-1 flex items-center gap-2">
          🌟 Pro Tip
        </h3>
        <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
          A powerful title and well-defined category improve discoverability and SEO performance significantly.
        </p>
      </motion.div>
    </motion.div>
  );
}
