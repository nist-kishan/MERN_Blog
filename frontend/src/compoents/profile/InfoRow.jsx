import { motion } from "framer-motion";

export default function InfoRow({ icon, label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm dark:shadow-none hover:shadow-md dark:hover:bg-gray-700 transition-all duration-300"
    >
      {icon && (
        <div className="text-blue-500 dark:text-blue-400 text-lg">
          {icon}
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm sm:text-base">
        <span className="font-semibold text-gray-800 dark:text-gray-100">{label}:</span>
        <span className="text-gray-600 dark:text-gray-300">{value}</span>
      </div>
    </motion.div>
  );
}
