import { motion } from "framer-motion";
import { Tags, Sparkles, ShieldCheck } from "lucide-react";

export default function Page3({ formData, setFormData }) {
  const handleTagChange = (e) => {
    const tags = e.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    setFormData({ ...formData, tags });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto bg-gradient-to-br from-white via-gray-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-xl rounded-2xl p-6 md:p-10 flex flex-col gap-8 border border-gray-200 dark:border-gray-700"
    >
      {/* Title */}
      <div className="flex items-center gap-2">
        <Sparkles className="text-purple-600 dark:text-purple-400 w-5 h-5" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Page 3: Description, Tags & Role
        </h2>
      </div>

      {/* Full Description */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Full Description
        </label>
        <textarea
          rows={16}
          placeholder="Write your full blog content here..."
          className="bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-gray-900 dark:text-white resize-y shadow-inner min-h-[300px]"
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
          <Tags className="w-4 h-4" /> Tags
        </label>
        <input
          type="text"
          placeholder="e.g. react, design, tailwind"
          className="bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-gray-900 dark:text-white shadow-sm"
          value={formData.tags.join(", ")}
          onChange={handleTagChange}
        />
      </div>

      {/* Blog Visibility Role */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" /> Blog Visibility
        </label>
        <select
          className="w-full sm:max-w-xs bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-gray-900 dark:text-white shadow-sm transition-all"
          value={formData.blogRole}
          onChange={(e) =>
            setFormData({ ...formData, blogRole: e.target.value })
          }
        >
          <option value="public">🌐 Public</option>
          <option value="followers">👥 Followers</option>
          <option value="private">🔒 Private</option>
        </select>
      </div>
    </motion.div>
  );
}
