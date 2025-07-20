// Page2.jsx
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ImagePlus,
  Video,
  Eye,
  UploadCloud,
  FileImage,
  FileVideo,
  X,
} from "lucide-react";

export default function Page2({ formData, setFormData }) {
  const [preview, setPreview] = useState(null);
  const imageRef = useRef(null);
  const videoRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: [...formData.images, ...previews] });
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, video: [...formData.video, ...previews] });
  };

  const glassCard =
    "border rounded-2xl p-4 bg-white/30 dark:bg-gray-700/40 backdrop-blur-md shadow-xl hover:shadow-2xl transition-shadow";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="space-y-10 p-6 md:p-10 bg-gradient-to-br from-white via-gray-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl"
    >
      <div className="space-y-2 text-center">
        <motion.h2
          className="text-4xl font-extrabold text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          🎨 Media Upload & Overview
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Upload captivating images and videos to enhance your blog post
        </p>
      </div>

      {/* Upload Areas */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Upload */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white flex items-center gap-2">
              <FileImage /> Upload Images
            </h3>
            <button
              onClick={() => imageRef.current?.click()}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={imageRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {formData.images.map((img, i) => (
              <motion.div
                key={i}
                layout
                className="relative group overflow-hidden rounded-xl"
              >
                <img
                  src={img}
                  alt={`img-${i}`}
                  className="object-cover h-28 w-full rounded-lg shadow-md"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => setPreview({ type: "image", src: img })}
                    className="text-white hover:scale-110 transition"
                  >
                    <Eye className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Video Upload */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white flex items-center gap-2">
              <FileVideo /> Upload Videos
            </h3>
            <button
              onClick={() => videoRef.current?.click()}
              className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Browse
            </button>
            <input
              type="file"
              accept="video/*"
              multiple
              ref={videoRef}
              onChange={handleVideoUpload}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {formData.video.map((vid, i) => (
              <motion.div
                key={i}
                layout
                className="relative group overflow-hidden rounded-xl"
              >
                <video
                  src={vid}
                  className="rounded-lg h-32 w-full object-cover"
                  muted
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => setPreview({ type: "video", src: vid })}
                    className="text-white hover:scale-110 transition"
                  >
                    <Eye className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className={glassCard}>
        <label className="text-xl font-semibold text-gray-700 dark:text-white block mb-3">
          📝 Blog Overview
        </label>
        <textarea
          value={formData.overview}
          onChange={(e) =>
            setFormData({ ...formData, overview: e.target.value })
          }
          rows={6}
          className="w-full rounded-xl px-4 py-3 border-none bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-inner text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
          placeholder="Summarize your blog in a few sentences..."
        />
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              className="relative max-w-3xl w-full p-4"
            >
              <button
                onClick={() => setPreview(null)}
                className="absolute top-4 right-4 bg-white/90 p-1 rounded-full hover:bg-red-500 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              {preview.type === "image" ? (
                <img
                  src={preview.src}
                  alt="preview"
                  className="rounded-xl shadow-2xl w-full"
                />
              ) : (
                <video
                  src={preview.src}
                  controls
                  className="rounded-xl shadow-2xl w-full"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
