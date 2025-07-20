import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FilePenLine, Save, ArrowLeft, Loader2 } from "lucide-react";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const descRef = useRef(null);
  const MIN_LINES = 5;
  const MAX_LINES = 50;

  const [blog, setBlog] = useState({
    title: "",
    category: "",
    overview: "",
    description: "",
    images: [],
  });
  const [imageInput, setImageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/blog/view/${id}`);
        const data = res.data.data;
        setBlog({
          title: data.title || "",
          category: data.category || "",
          overview: data.overview || "",
          description: data.description || "",
          images: data.images || [],
        });
        setImageInput(data.images?.[0] || "");
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    resizeTextarea();
  }, [blog.description]);

  const resizeTextarea = () => {
    if (!descRef.current) return;
    const textarea = descRef.current;
    textarea.style.height = "auto";
    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 10);
    const padding = textarea.offsetHeight - textarea.clientHeight;
    const maxHeight = MAX_LINES * lineHeight + padding;
    const minHeight = MIN_LINES * lineHeight + padding;
    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const url = e.target.value;
    setImageInput(url);
    setBlog((prev) => ({ ...prev, images: url ? [url] : [] }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/blog/edit/${id}`, blog);
      navigate("/my-blogs");
    } catch (err) {
      console.error("Error updating blog:", err);
      setError("Failed to update blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: "p-4 sm:p-6 md:p-10 w-full max-w-7xl mx-auto transition-all duration-300",
    title: "text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2",
    form: "w-full bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl space-y-5 transition-all",
    label: "block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200",
    input: "w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
    select: "w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
    textarea: "w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
    imagePreview: "w-full h-56 object-cover rounded-xl mt-2 shadow-lg",
    actions: "flex justify-between items-center pt-4",
    cancelButton: "cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-400 text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-gray-700 backdrop-blur-sm transition",
    saveButton: "cursor-pointer flex items-center gap-2 px-6 py-2 rounded-xl shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed",
    saveButtonActive: "bg-blue-600 hover:bg-blue-700 text-white",
    saveButtonDisabled: "bg-gray-400 text-gray-200",
  };

  return (
    <div className={styles.container}>
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={styles.title}>
        <FilePenLine className="w-7 h-7 text-blue-600 dark:text-blue-400" />
        Edit Blog
      </motion.h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSave} className={styles.form}>
        {/* Title */}
        <div>
          <label className={styles.label}>Title</label>
          <input type="text" name="title" value={blog.title} onChange={handleChange} required className={styles.input} disabled={loading} />
        </div>

        {/* Category */}
        <div>
          <label className={styles.label}>Category</label>
          <select name="category" value={blog.category} onChange={handleChange} required className={styles.select} disabled={loading}>
            <option value="">Select category</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
            <option value="AI">AI</option>
            <option value="DevOps">DevOps</option>
          </select>
        </div>

        <div>
          <label className={styles.label}>Overview</label>
          <textarea name="overview" rows={5} value={blog.overview} onChange={handleChange} required className={styles.textarea} disabled={loading} />
        </div>

        <div>
          <label className={styles.label}>Description</label>
          <textarea
            ref={descRef}
            name="description"
            rows={MIN_LINES}
            value={blog.description}
            onChange={handleChange}
            required
            className={styles.textarea}
            disabled={loading}
          />
        </div>

        <div>
          <label className={styles.label}>Image URL</label>
          <input type="url" name="image" value={imageInput} onChange={handleImageChange} className={styles.input} disabled={loading} />
        </div>

        {imageInput && <img src={imageInput} alt="Blog preview" className={styles.imagePreview} />}

        <div className={styles.actions}>
          <button type="button" onClick={() => navigate(-1)} className={styles.cancelButton} disabled={loading}>
            <ArrowLeft className="w-4 h-4" />
            Cancel
          </button>
          <button type="submit" className={`${styles.saveButton} ${loading ? styles.saveButtonDisabled : styles.saveButtonActive}`} disabled={loading}>
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
