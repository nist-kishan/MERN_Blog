import { ChevronDown, Search } from "lucide-react";

export default function BlogFilters({
  categories,
  search,
  setSearch,
  sort,
  setSort,
  selectedCategories,
  setSelectedCategories,
  setPage,
}) {
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const styles = {
    container:
      "sticky top-0 z-40 bg-white dark:bg-gray-900 p-4 shadow rounded-lg mb-6",
    layout:
      "flex flex-col md:flex-row md:items-center md:justify-between gap-4",
    searchBox: {
      wrapper: "flex-1 flex items-center gap-2",
      input:
        "w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent outline-none",
      icon: "text-gray-500",
    },
    filters: {
      wrapper: "flex flex-wrap items-center gap-2",
      categories: {
        wrapper: "relative group",
        summary:
          "cursor-pointer px-3 py-1 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm flex items-center gap-1",
        dropdown:
          "absolute z-50 max-h-[300px] overflow-y-auto w-64 mt-2 bg-white dark:bg-gray-900 shadow-lg border rounded-md p-3 space-y-2",
        item: "flex items-center gap-2",
      },
      sortSelect:
        "border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1 bg-white dark:bg-gray-800 text-sm",
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.searchBox.wrapper}>
          <Search className={styles.searchBox.icon} />
          <input
            type="text"
            placeholder="Search blogs..."
            className={styles.searchBox.input}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className={styles.filters.wrapper}>
          <details className={styles.filters.categories.wrapper}>
            <summary className={styles.filters.categories.summary}>
              Categories <ChevronDown size={14} />
            </summary>
            <div className={styles.filters.categories.dropdown}>
              {categories.map((cat) => (
                <div key={cat} className={styles.filters.categories.item}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  <label>{cat}</label>
                </div>
              ))}
            </div>
          </details>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className={styles.filters.sortSelect}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>
    </div>
  );
}
