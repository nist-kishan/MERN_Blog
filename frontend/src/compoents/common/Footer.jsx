import { motion } from "framer-motion";
import { Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const footerStyles = {
    container:
      "bg-gray-100 dark:bg-gray-900 py-10 mt-16 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800",
    grid: "max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8",
    heading: "text-lg font-semibold mb-3",
    subHeading: "text-md font-semibold mb-2",
    linkList: "space-y-1 text-sm",
    link: "hover:underline",
    iconGroup: "flex space-x-4 mt-3",
    iconLink: "transition",
    copyright:
      "mt-10 border-t border-gray-200 dark:border-gray-700 text-center text-xs py-4 px-4",
  };

  const socialLinks = [
    {
      icon: <Twitter size={20} />,
      href: "https://x.com/kishanrajrby2",
      hover: "hover:text-blue-600",
    },
    {
      icon: <Github size={20} />,
      href: "https://github.com/nist-kishan",
      hover: "hover:text-gray-800 dark:hover:text-gray-100",
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:kishanrajrby2@gmail.com",
      hover: "hover:text-red-500",
    },
  ];

  const navLinks = {
    Links: [
      { label: "Home", href: "/" },
      { label: "Explore", href: "/explore" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blogs" },
      { label: "About", href: "/about" },
    ],
    Resources: [
      { label: "Docs", href: "/docs" },
      { label: "Support", href: "/support" },
      { label: "API", href: "/api" },
      { label: "Community", href: "/community" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className={footerStyles.container}
    >
      <div className={footerStyles.grid}>
        <div>
          <h3 className={footerStyles.heading}>My Blog App</h3>
          <p className="text-sm">
            A modern blog platform built for developers and writers to share
            their ideas with the world.
          </p>
        </div>

        {Object.entries(navLinks).map(([title, items]) => (
          <div key={title}>
            <h4 className={footerStyles.subHeading}>{title}</h4>
            <ul className={footerStyles.linkList}>
              {items.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={footerStyles.link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className={footerStyles.subHeading}>Connect</h4>
          <div className={footerStyles.iconGroup}>
            {socialLinks.map(({ icon, href, hover }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${footerStyles.iconLink} ${hover}`}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={footerStyles.copyright}>
        © {new Date().getFullYear()} My Blog App. All rights reserved.
      </div>
    </motion.footer>
  );
}
