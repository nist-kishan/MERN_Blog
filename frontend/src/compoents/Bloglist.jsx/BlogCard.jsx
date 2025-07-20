import { motion } from "framer-motion";

export default function BlogCard({ blog, onClick }) {
  const hasImage = blog.images?.length > 0;
  const createdAt = new Date(blog.createdAt).toDateString();

  const cardStyles = {
    base: "rounded-xl shadow transition-all cursor-pointer overflow-hidden",
    light: "bg-white hover:shadow-lg",
    dark: "dark:bg-gray-800",
  };

  const imageStyles = {
    wrapper: "w-full aspect-video bg-white dark:bg-gray-900 flex items-center justify-center",
    img: "max-h-full max-w-full object-contain",
  };

  const contentStyles = {
    container: "p-4",
    title: "text-lg font-semibold mb-1 line-clamp-2",
    meta: "text-sm text-gray-500 dark:text-gray-400",
    overview: "text-sm mt-2 line-clamp-3",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`${cardStyles.base} ${cardStyles.light} ${cardStyles.dark}`}
    >
      {hasImage && (
        <div className={imageStyles.wrapper}>
          <img
            src={blog.images[0]}
            alt={blog.title}
            className={imageStyles.img}
          />
        </div>
      )}

      <div className={contentStyles.container}>
        <h2 className={contentStyles.title}>{blog.title}</h2>
        <p className={contentStyles.meta}>
          {blog.category} · {createdAt}
        </p>
        <p className={contentStyles.overview}>{blog.overview}</p>
      </div>
    </motion.div>
  );
}
