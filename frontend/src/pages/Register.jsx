import { useState } from "react";
import { Mail, Lock, User, KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import { FaGoogle, FaGithub, FaMicrosoft } from "react-icons/fa";

export default function Register({ onSubmit, switchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: ""
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onSubmit(formData);
  };

  const handleOAuth = (provider) => {
    // console.log(`Redirect to ${provider} auth`);
    // Redirect logic goes here
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Blur Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-200/30 via-white/30 to-indigo-100/20 dark:from-gray-900/40 dark:via-gray-800/30 dark:to-gray-900/20 backdrop-blur-xl"
      />

      {/* Form Box */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-xl space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Sign Up
          </h2>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <OAuthButton icon={<FaGoogle />} label="Google" onClick={() => handleOAuth("google")} />
            <OAuthButton icon={<FaGithub />} label="GitHub" onClick={() => handleOAuth("github")} />
            <OAuthButton icon={<FaMicrosoft />} label="Microsoft" onClick={() => handleOAuth("microsoft")} />
          </div>

          <div className="text-center text-gray-500 text-sm">or use email</div>

          <InputField icon={<User size={16} />} placeholder="Full Name" name="name" onChange={handleChange} value={formData.name} />
          <InputField icon={<Mail size={16} />} type="email" placeholder="Email" name="email" onChange={handleChange} value={formData.email} />
          <InputField icon={<KeyRound size={16} />} placeholder="Username" name="username" onChange={handleChange} value={formData.username} />
          <InputField icon={<Lock size={16} />} type="password" placeholder="Password" name="password" onChange={handleChange} value={formData.password} />
          <InputField icon={<Lock size={16} />} type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} />

          {/* Gender Select */}
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-800/60 border-gray-300 dark:border-gray-700 focus-within:ring-2 focus-within:ring-indigo-400">
            <select
              name="gender"
              onChange={handleChange}
              value={formData.gender}
              className="w-full bg-transparent text-sm text-gray-700 dark:text-white placeholder-gray-400 focus:outline-none appearance-none"
            >
              <option value="" disabled>Select Gender</option>
              <option className="bg-white dark:bg-gray-800" value="male">Male</option>
              <option className="bg-white dark:bg-gray-800" value="female">Female</option>
              <option className="bg-white dark:bg-gray-800" value="other">Other</option>
            </select>
          </div>

          {/* Age Input */}
          <InputField type="number" placeholder="Age" name="age" onChange={handleChange} value={formData.age} />

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold shadow transition"
          >
            Register
          </motion.button>

          <div className="text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <button type="button" onClick={switchToLogin} className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Login
            </button>
          </div>
        </div>
      </motion.form>
    </div>
  );
}

// Input Field Component
function InputField({ icon, ...props }) {
  return (
    <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-800/60 border-gray-300 dark:border-gray-700 focus-within:ring-2 focus-within:ring-indigo-400">
      <div className="text-gray-500 dark:text-gray-400">{icon}</div>
      <input
        className="w-full bg-transparent text-sm text-gray-700 dark:text-white placeholder-gray-400 focus:outline-none"
        {...props}
      />
    </div>
  );
}

// OAuth Button Component
function OAuthButton({ icon, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex items-center justify-center gap-2 px-2 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
    >
      {icon}
    </button>
  );
}
