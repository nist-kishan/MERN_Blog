import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BlogFilters from "../compoents/Bloglist.jsx/BlogFilters";
import BlogCard from "../compoents/Bloglist.jsx/BlogCard";
import Pagination from "../compoents/Pagination";

const styles = {
  wrapper: "min-h-screen px-4 md:px-8 pb-10",
  grid: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
  emptyMsg: "col-span-full text-center text-gray-500 dark:text-gray-400",
};

const categories = [
  "Tech",
  "Health",
  "Travel",
  "Food",
  "Fashion",
  "Finance",
  "Education",
  "Fitness",
  "Gaming",
  "Science",
  "Books",
  "Movies",
  "Music",
  "Art",
  "Sports",
  "News",
  "DIY",
  "Parenting",
  "Business",
  "Spiritual",
];

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const filters = {
    search,
    category: selectedCategories,
    sortType: sort || "latest",
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blog/list", {
        params: { page, limit: 10, filter: JSON.stringify(filters) },
      });
      setBlogs(res.data.data.blogs || []);
      setTotalPages(res.data.data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, search, sort, selectedCategories]);

  return (
    <div className={styles.wrapper}>
      <BlogFilters
        categories={categories}
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        setPage={setPage}
      />

      <div className={styles.grid}>
        {blogs.length === 0 ? (
          <div className={styles.emptyMsg}>No blogs found.</div>
        ) : (
          blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              onClick={() => navigate(`/blog/${blog._id}`)}
            />
          ))
        )}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setPage={setPage}
      />
    </div>
  );
}
