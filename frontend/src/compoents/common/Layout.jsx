import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import MobileNav from "./MobileNav";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? styles.sidebarCollapsed : styles.sidebarExpanded;
  const marginLeft = collapsed ? styles.marginLeftCollapsed : styles.marginLeftExpanded;

  return (
    <div className={styles.root}>
      {/* Header */}
      <div className={styles.headerWrapper}>
        <Header />
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* Sidebar */}
        <div className={`${styles.sidebarBase} ${sidebarWidth}`}>
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        {/* Main Content */}
        <main className={`${styles.main} ${marginLeft}`}>
          <div className={styles.mainContainer}>
            <div className={styles.outlet}>
              <Outlet />
            </div>
            <Footer />
          </div>
        </main>
      </div>

      {/* Mobile Nav */}
      <MobileNav />
    </div>
  );
}

const styles = {
  root: "min-h-screen text-gray-900 dark:text-white transition-colors duration-300",
  headerWrapper: "fixed top-0 left-0 right-0 z-50",
  body: "pt-[72px] flex",

  // Sidebar
  sidebarBase:
    "fixed top-[78px] left-0 h-[calc(100vh-72px)] z-40 transition-all duration-300 hidden sm:block",
  sidebarCollapsed: "w-20",
  sidebarExpanded: "w-[260px]",

  // Main
  main: "transition-all duration-300 flex-1 h-[calc(100vh-72px)] overflow-auto rounded-tl-3xl shadow-inner",
  marginLeftCollapsed: "sm:ml-20",
  marginLeftExpanded: "sm:ml-[260px]",

  // Main Container
  mainContainer: "min-h-full m-0 p-0 flex flex-col pb-14 sm:pb-0",
  outlet: "flex-1 p-4",
};
