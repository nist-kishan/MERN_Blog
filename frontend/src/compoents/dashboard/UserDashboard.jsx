import { motion } from "framer-motion";
import {
  FileText,
  Bookmark,
  MessageSquareText,
  ShieldCheck,
  BookOpenCheck,
  FilePen,
  Heart,
} from "lucide-react";

export default function UserDashboard({ user }) {
  const firstName = user?.name?.split(" ")[0] || "User";

  const stats = [
    { label: "Published Blogs", value: 12, icon: FileText },
    { label: "Saved Blogs", value: 7, icon: Bookmark },
    { label: "Comments", value: 32, icon: MessageSquareText },
    { label: "Role", value: user?.role || "User", icon: ShieldCheck },
  ];

  const dummyData = (prefix) =>
    Array.from({ length: 5 }, (_, i) => `${prefix} Blog ${i + 1}`);

  const sections = [
    {
      title: "Last Read Blogs",
      icon: BookOpenCheck,
      items: dummyData("Read"),
    },
    {
      title: "Drafts",
      icon: FilePen,
      items: dummyData("Draft"),
    },
    {
      title: "Favorite Blogs",
      icon: Heart,
      items: dummyData("Favorite"),
    },
  ];

  return (
    <div className="w-full px-4 py-6 md:px-10 space-y-8">
      {/* Greeting */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 dark:text-white"
      >
        👋 Welcome back, {firstName}!
      </motion.h1>

      {/* Your Info */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative p-6 rounded-2xl border border-white/20 backdrop-blur-xl shadow-lg bg-white/10 dark:bg-black/30 overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl animate-pulse z-0" />
        <h2 className="text-xl font-semibold text-white mb-4 relative z-10">Your Info</h2>
        <div className="space-y-2 text-sm text-white/90 relative z-10">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow"
          >
            <stat.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              <div className="text-lg font-semibold text-gray-800 dark:text-white">{stat.value}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Blog Sections */}
      <div className="grid gap-6 lg:grid-cols-3">
        {sections.map(({ title, icon: Icon, items }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow"
          >
            <div className="flex items-center gap-2 mb-3 text-indigo-600 dark:text-indigo-400 font-medium text-lg">
              <Icon className="w-5 h-5" />
              {title}
            </div>
            <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
              {items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
