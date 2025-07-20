import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { FaGoogle, FaGithub, FaMicrosoft } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Login({ onSubmit }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100/40 via-white to-indigo-200/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-sm relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-white/60 dark:bg-gray-900/50 backdrop-blur-md z-0"
      />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="z-10 w-full max-w-md bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 p-8 rounded-3xl shadow-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Welcome Back</h2>

        <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white/60 dark:bg-gray-800/60 border-gray-300 dark:border-gray-700 focus-within:ring-2 focus-within:ring-indigo-400">
          <Mail className="text-gray-500 dark:text-gray-400" size={18} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full bg-transparent text-sm text-gray-700 dark:text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white/60 dark:bg-gray-800/60 border-gray-300 dark:border-gray-700 focus-within:ring-2 focus-within:ring-indigo-400">
          <Lock className="text-gray-500 dark:text-gray-400" size={18} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full bg-transparent text-sm text-gray-700 dark:text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold shadow-md transition"
        >
          Login
        </motion.button>

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <FaGoogle size={16} />
            Google
          </button>
          <button
            type="button"
            className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <FaGithub size={16} />
            GitHub
          </button>
          <button
            type="button"
            className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <FaMicrosoft size={16} />
            Microsoft
          </button>
        </div>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Sign up here
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
