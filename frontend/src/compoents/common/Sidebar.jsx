import { Menu } from "lucide-react";
import clsx from "clsx";
import { useLocation, Link } from "react-router-dom";

const adminLinks = [
  { label: "Dashboard", icon: "📊", link: "/" },
  { label: "Posts", icon: "✏️", link: "/posts" },
  { label: "Users", icon: "👥", link: "/users" },
  { label: "Settings", icon: "⚙️", link: "/settings" },
];

const userLinks = [
  { label: "Dashboard", icon: "🏠", link: "/" },
  { label: "My Blogs", icon: "📝", link: "/my-blogs" },
  { label: "Saved", icon: "💾", link: "/saved" },
  { label: "Profile", icon: "🙍‍♂️", link: "/profile" },
];

export default function Sidebar({ collapsed, setCollapsed, role = "user" }) {
  const location = useLocation();
  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <aside
      className={clsx(
        "flex-shrink-0 flex flex-col h-full rounded-xl shadow-inner p-5 transition-all duration-300",
        "bg-white text-gray-800 shadow-gray-300 dark:bg-[#1c1f26] dark:text-white dark:shadow-black/30",
        collapsed ? "items-center" : "w-full"
      )}
    >
      <div className={clsx("flex items-center justify-between mb-8 w-full", collapsed && "justify-center")}>
        {!collapsed && <h2 className="text-xl font-semibold">My Panel</h2>}
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-[#2a2d36] rounded-full shadow-md cursor-pointer"
        >
          <Menu size={20} className="text-gray-600 dark:text-gray-300" />
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {links.map((link) => {
          const isActive = location.pathname === link.link;

          return (
            <Link
              key={link.label}
              to={link.link}
              className={clsx(
                "flex items-center gap-3 text-sm font-medium px-4 py-3 rounded-2xl cursor-pointer transition-all",
                isActive
                  ? "bg-gradient-to-br from-[#2e3a59] to-[#1f2533] text-white shadow-lg shadow-black/60"
                  : "text-gray-500 hover:bg-gray-100 hover:dark:bg-[#2a2d36] hover:text-black dark:hover:text-white",
                collapsed && "justify-center px-2"
              )}
            >
              <span className="text-xl">{link.icon}</span>
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
