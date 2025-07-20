import { motion } from "framer-motion";

export default function Badge({ label, icon, color = "indigo" }) {
  const baseClasses = `text-${color}-600 dark:text-${color}-300 bg-${color}-100 dark:bg-${color}-900`;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${baseClasses} transition-all duration-200 hover:scale-105`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </motion.span>
  );
}
