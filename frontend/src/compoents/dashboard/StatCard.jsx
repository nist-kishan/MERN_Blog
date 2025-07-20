import { motion } from "framer-motion";

export default function StatCard({ title, value, color = "text-blue-600 dark:text-blue-400" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ring-1 ring-gray-200 dark:ring-gray-700"
    >
      <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2 tracking-wide">
        {title}
      </h2>
      <p className={`text-4xl font-extrabold ${color}`}>{value}</p>
    </motion.div>
  );
}
