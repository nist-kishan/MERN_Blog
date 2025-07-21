import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Stepper from "../compoents/createBlog/Stepper";
import NavigationButtons from "../compoents/createBlog/NavigationButtons";

import Page1 from "../compoents/createBlog/Page1";
import Page2 from "../compoents/createBlog/Page2";
import Page3 from "../compoents/createBlog/Page3";
import Preview from "../compoents/createBlog/Preview";
import BlogPostStatus from "../compoents/createBlog/BlogPostStatus";

export default function CreateBlog() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const nav = useNavigate();
  const stepperRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isErrorMessage, setIsErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    user: "687843edd3d7fc963e0ea50b",
    title: "",
    category: "",
    images: [],
    video: [],
    overview: "",
    description: "",
    tags: [],
    blogRole: "public",
  });

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, 4));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handlePublish = async () => {
    try {
      setCurrentPage(5);
      const res = await axios.post(`${baseURL}/blog/create`, formData);
      setIsSuccess(res.data?.success);
    } catch (error) {
      setIsSuccess(false);
      setIsErrorMessage(
        error.response?.data?.message || "An error occurred while publishing the blog."
      );
    }
  };

  useEffect(() => {
    if (stepperRef.current) {
      stepperRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <Page1 formData={formData} setFormData={setFormData} />;
      case 2:
        return <Page2 formData={formData} setFormData={setFormData} />;
      case 3:
        return <Page3 formData={formData} setFormData={setFormData} />;
      case 4:
        return <Preview formData={formData} onPublish={handlePublish} />;
      default:
        return <BlogPostStatus isSuccess={isSuccess} errorMessage={isErrorMessage} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto p-4 py-10 space-y-10 min-h-screen text-gray-900 dark:text-gray-100"
    >
      <div className="bg-white/40 dark:bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-2xl space-y-10">
        <Stepper
          currentPage={currentPage}
          isSuccess={isSuccess}
          ref={stepperRef}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>

        <NavigationButtons
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </motion.div>
  );
}
