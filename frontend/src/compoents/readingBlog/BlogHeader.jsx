export default function BlogHeader({ title, author, date, category }) {
  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        By <span className="font-medium">{author}</span> • {date} •{" "}
        <span className="italic">{category}</span>
      </div>
    </div>
  );
}
