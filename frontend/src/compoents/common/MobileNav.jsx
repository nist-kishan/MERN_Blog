// src/components/MobileNav.jsx
import { Home, Search, PlusSquare, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { icon: <Home size={24} />, path: "/", label: "Home" },
  { icon: <Search size={24} />, path: "/blogs", label: "Search" },
  { icon: <PlusSquare size={24} />, path: "/create-blog", label: "Create" },
  { icon: <User size={24} />, path: "/profile", label: "Profile" },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 py-2 sm:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {navItems.map((item, idx) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            to={item.path}
            key={idx}
            className={`flex flex-col items-center text-xs ${
              isActive ? "text-blue-500" : "text-gray-500 dark:text-zinc-400"
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-1">{item.label}</span>
          </Link>
        );
      })}
    </motion.nav>
  );
}
