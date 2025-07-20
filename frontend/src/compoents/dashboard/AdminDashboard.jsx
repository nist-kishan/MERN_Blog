import { motion } from "framer-motion";
import Topbar from "./Topbar";
import StatCard from "./StatCard";
import PostsTable from "./PostsTable";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <main className="flex-1 p-6 overflow-hidden">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Topbar />
        </motion.div>

        {/* Stat Cards Section */}
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {[ // Use array to animate individually
            { title: "Total Posts", value: "128", color: "text-blue-600 dark:text-blue-400" },
            { title: "Active Users", value: "67", color: "text-green-600 dark:text-green-400" },
            { title: "Comments", value: "312", color: "text-purple-600 dark:text-purple-400" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </motion.section>

        {/* Posts Table */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PostsTable />
        </motion.div>
      </main>
    </div>
  );
}
