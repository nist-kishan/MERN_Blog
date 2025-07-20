import { useEffect, useState } from "react";
import {
  FileText,
  Pencil,
  Trash2,
  Eye,
  Clock,
  Loader2,
  X,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyBlogs() {
  const navigate = useNavigate();
  const [myBlogs, setMyBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const filter = { user: "687843edd3d7fc963e0ea50b" };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/blog/list", {
        params: { page, limit: 10, filter: JSON.stringify(filter) },
      });
      const { blogs, totalPages } = res.data.data;
      setMyBlogs(blogs || []);
      setTotalPages(totalPages || 1);
    } catch (err) {
      setError("Unable to load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const confirmDelete = (blog) => {
    setBlogToDelete(blog);
    setShowDialog(true);
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;

    try {
      setDeletingId(blogToDelete._id);
      await axios.delete(`http://localhost:5000/api/blog/delete/${blogToDelete._id}`);
      setMyBlogs((prev) => prev.filter((blog) => blog._id !== blogToDelete._id));
      setShowDialog(false);
      setBlogToDelete(null);
    } catch (err) {
      setError("Failed to delete blog. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (id) => navigate(`/edit-blog/${id}`);
  const handleView = (id) => navigate(`/blog/${id}`);

  return (
    <div className="p-6 md:p-10">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"
      >
        <FileText className="w-7 h-7 text-blue-600 dark:text-blue-400" />
        My Blogs
      </motion.h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      ) : myBlogs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No blogs yet. Start writing!</p>
      ) : (
        <div className="grid gap-5">
          {myBlogs.map((blog) => (
            <motion.div
              key={blog._id}
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
                    Category: <span className="font-medium">{blog.category}</span>
                  </p>
                  <div className="flex items-center gap-1 text-sm mt-1 text-gray-500 dark:text-gray-400">
                    {blog.status === "published" ? (
                      <Eye className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-500" />
                    )}
                    {blog.status}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(blog._id)}
                    className="px-3 py-1 text-sm rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 disabled:opacity-50"
                    disabled={deletingId === blog._id}
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(blog)}
                    className="px-3 py-1 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center gap-1 disabled:opacity-50"
                    disabled={deletingId === blog._id}
                  >
                    {deletingId === blog._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    {deletingId === blog._id ? "Deleting" : "Delete"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Animated Dialog */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4"
            >
              <AlertTriangle className="mx-auto w-10 h-10 text-red-500" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Delete blog?
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete{" "}
                <span className="font-medium text-red-500">{blogToDelete?.title}</span>?
                This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => {
                    setShowDialog(false);
                    setBlogToDelete(null);
                  }}
                  className="px-4 py-1.5 text-sm rounded-lg border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-1.5 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white shadow-md transition"
                >
                  {deletingId === blogToDelete?._id ? (
                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
              <button
                onClick={() => {
                  setShowDialog(false);
                  setBlogToDelete(null);
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
