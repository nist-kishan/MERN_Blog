import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BadgeCheck, ImageIcon, VideoIcon } from "lucide-react";

export default function Preview({ formData, onPublish }) {
  const { title, category, overview, description, images, video, tags, blogRole } = formData;
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (description) {
      setWordCount(description.trim().split(/\s+/).length);
    }
  }, [description]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full space-y-10 px-4 md:px-10 lg:px-20 py-6"
    >
      {/* Header */}
      <div className="text-center space-y-1">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-black text-gray-900 dark:text-white drop-shadow-lg"
        >
          🌟 Final Blog Preview
        </motion.h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Please ensure everything looks perfect before publishing.
        </p>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 shadow-2xl rounded-3xl backdrop-blur-md p-6 md:p-10 space-y-8"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Title</p>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white leading-snug">{title}</h3>

            <div className="mt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Category</p>
              <span className="inline-block bg-indigo-100 dark:bg-indigo-800/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
                {category}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Overview</p>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed border-l-4 pl-4 border-indigo-500 dark:border-indigo-400">
              {overview}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {images?.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-300">
                <ImageIcon className="w-5 h-5" />
                <span className="font-semibold text-sm">Image Gallery</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="preview-img"
                    className="rounded-xl object-cover w-full h-32 md:h-40 border border-gray-200 dark:border-gray-700 shadow-sm hover:scale-105 transition duration-300"
                  />
                ))}
              </div>
            </div>
          )}

          {video?.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-300">
                <VideoIcon className="w-5 h-5" />
                <span className="font-semibold text-sm">Attached Videos</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {video.map((vid, i) => (
                  <video
                    key={i}
                    src={vid}
                    controls
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-700 shadow-lg"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tags and Visibility */}
        <div className="flex flex-wrap justify-between items-start gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tags</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-300 px-3 py-1 text-xs font-semibold rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Visibility</p>
            <span className="text-sm px-2 py-1 rounded-lg bg-green-200 dark:bg-green-700/30 text-green-800 dark:text-green-300 font-semibold capitalize">
              {blogRole}
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Full Description</p>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 max-h-[500px] overflow-y-auto text-sm text-gray-700 dark:text-gray-200 whitespace-pre-line">
            {description}
          </div>
          <p className="text-xs text-end text-gray-400 dark:text-gray-500 mt-1">{wordCount} words</p>
        </div>

        {/* Publish Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPublish}
          className="w-full md:w-1/3 mx-auto flex items-center justify-center gap-2 bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg py-3 rounded-xl shadow-xl transition-all duration-300"
        >
          <BadgeCheck className="w-5 h-5" /> Publish Blog
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
