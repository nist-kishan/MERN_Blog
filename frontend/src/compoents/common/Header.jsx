import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Compass,
  Info,
  PlusCircle,
  History,
  LogOut,
  User,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const isAuthenticated = true;
  const user = {
    name: "Kishan Raj",
    profilePic: "https://i.pravatar.cc/150?img=12",
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const navItems = [
    { label: "Home", path: "/", icon: <Home size={16} /> },
    { label: "Blogs", path: "/blogs", icon: <Compass size={16} /> },
    { label: "About", path: "/about", icon: <Info size={16} /> },
  ];

  const dropdownItems = [
    { label: "Profile", path: "/profile", icon: <User size={16} /> },
    { label: "Add Blog", path: "/create-blog", icon: <PlusCircle size={16} /> },
    { label: "Blog History", path: "/history", icon: <History size={16} /> },
  ];

  const styles = {
    header:
      "bg-white dark:bg-[#1c1f26] shadow-md sticky top-0 z-50 transition-all duration-300",
    container: "max-w-7xl mx-auto px-4 py-4 flex justify-between items-center",
    title:
      "text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight cursor-pointer",
    nav: "hidden md:flex justify-center items-center gap-6 font-medium text-sm flex-1",
    navLink: (targetPath) =>
      `flex items-center gap-1.5 transition cursor-pointer ${
        path === targetPath
          ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
          : "hover:text-blue-500"
      }`,
    rightSection: "hidden md:flex items-center gap-4 relative",
    avatar: "w-9 h-9 rounded-full border-2 border-blue-500",
    userName: "font-medium text-sm text-gray-700 dark:text-gray-200",
    dropdownMenu:
      "absolute top-12 right-0 w-48 rounded-lg shadow-lg bg-white dark:bg-[#2c2f36] border dark:border-gray-700 overflow-hidden z-50",
    dropdownItem:
      "flex items-center gap-2 px-4 py-2 hover:bg-blue-50 dark:hover:bg-[#373b43] text-sm cursor-pointer",
    logoutItem:
      "flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-[#402b2b] text-sm cursor-pointer",
    authBtn:
      "block px-4 py-1.5 rounded-full text-center transition duration-200",
    signInBtn:
      "border border-blue-500 text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-[#2b3240]",
    signUpBtn: "bg-blue-600 hover:bg-blue-700 text-white",
    mobileToggleWrapper: "md:hidden flex items-center gap-2",
    mobileToggleBtn:
      "w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-[#2a2d36] rounded-full shadow-md transition",
    mobileMenu:
      "md:hidden px-6 pb-4 space-y-3 text-sm bg-white dark:bg-[#1c1f26]",
    mobileNavItem: "flex items-center gap-2 hover:text-blue-500",
    mobileLogoutBtn: "flex items-center gap-2 text-red-500 hover:text-red-600",
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 onClick={() => navigate("/")} className={styles.title}>
          My Blog App
        </h1>

        <nav className={styles.nav}>
          {navItems.map(({ label, path: target, icon }) => (
            <Link key={label} to={target} className={styles.navLink(target)}>
              {icon}
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.rightSection}>
          <ThemeToggle />
          {isAuthenticated ? (
            <div
              onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}
              className="relative flex items-center gap-2 cursor-pointer"
            >
              <img
                src={user.profilePic}
                alt="avatar"
                className={styles.avatar}
              />
              <span className={styles.userName}>{user.name}</span>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className={styles.dropdownMenu}
                  >
                    {dropdownItems.map(({ label, path, icon }) => (
                      <li
                        key={label}
                        onClick={() => navigate(path)}
                        className={styles.dropdownItem}
                      >
                        {icon}
                        {label}
                      </li>
                    ))}
                    <li
                      onClick={() => alert("Logging out...")}
                      className={styles.logoutItem}
                    >
                      <LogOut size={16} />
                      Logout
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <a
                href="/login"
                className={`${styles.authBtn} ${styles.signInBtn}`}
              >
                Sign In
              </a>
              <a
                href="/register"
                className={`${styles.authBtn} ${styles.signUpBtn}`}
              >
                Sign Up
              </a>
            </>
          )}
        </div>

        <div className={styles.mobileToggleWrapper}>
          <ThemeToggle />
          <button onClick={toggleMobileMenu} className={styles.mobileToggleBtn}>
            {isMobileMenuOpen ? (
              <X size={20} className="text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu size={20} className="text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={styles.mobileMenu}
          >
            {navItems.map(({ label, path, icon }) => (
              <a key={label} href={path} className={styles.mobileNavItem}>
                {icon}
                {label}
              </a>
            ))}

            {isAuthenticated ? (
              <>
                {dropdownItems.map(({ label, path, icon }) => (
                  <a key={label} href={path} className={styles.mobileNavItem}>
                    {icon}
                    {label}
                  </a>
                ))}
                <button className={styles.mobileLogoutBtn}>
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className={`${styles.authBtn} ${styles.signInBtn}`}
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className={`${styles.authBtn} ${styles.signUpBtn}`}
                >
                  Sign Up
                </a>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
