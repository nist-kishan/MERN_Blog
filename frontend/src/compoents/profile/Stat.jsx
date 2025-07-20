import { motion } from "framer-motion";

export default function Stat({ icon, label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 dark:border-gray-700 dark:bg-white/5 p-4 rounded-2xl shadow-xl flex items-center gap-4 cursor-pointer transition-all"
    >
      <div className="text-indigo-500 dark:text-indigo-400 text-xl">
        {icon}
      </div>
      <div>
        <div className="text-base font-semibold text-gray-900 dark:text-white">
          {value}
        </div>
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 tracking-wide uppercase">
          {label}
        </div>
      </div>
    </motion.div>
  );
}
