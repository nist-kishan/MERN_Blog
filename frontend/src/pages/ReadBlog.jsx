import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";

import BlogHeader from "../compoents/readingBlog/BlogHeader";
import CoverImage from "../compoents/readingBlog/CoverImage";
import VideoPlayer from "../compoents/readingBlog/VideoPlayer";
import BlogContent from "../compoents/readingBlog/BlogContent";
import ReactionButtons from "../compoents/readingBlog/ReactionButtons";
import CommentSection from "../compoents/readingBlog/CommentSection";

export default function ReadBlog() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [blog, setBlog] = useState(null);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${baseURL}/blog/view/${id}`);
      const blogData = response?.data?.data;
      console.log(response)
      setBlog(blogData);
      setLikes(blogData.likes || 0);
    } catch (error) {
      console.error("Failed to fetch blog:", error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div className="text-center py-10 text-red-500 font-semibold">Blog not found or loading failed.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen px-4 py-8 transition-colors duration-500">
      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <BlogHeader
          title={blog.title}
          author={blog.user?.name || "Unknown"}
          date={new Date(blog.createdAt).toLocaleDateString()}
          category={blog.category}
        />

        {blog.images?.length > 0 && <CoverImage src={blog.images[0]} />}
        {blog.video?.length > 0 && <VideoPlayer url={blog.video[0]} />}

        <BlogContent content={blog.description} />

        <ReactionButtons
          likes={likes}
          setLikes={setLikes}
          dislikes={dislikes}
          setDislikes={setDislikes}
        />

        <CommentSection comment={blog.comment} />
      </motion.div>
    </div>
  );
}
