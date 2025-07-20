import { ChevronLeft, ChevronRight } from "lucide-react";

const styles = {
  container: "flex justify-center mt-10 flex-wrap gap-2",
  button:"px-4 py-2 border rounded-md transition text-sm font-medium shadow-sm",
  active:"bg-blue-600 text-white dark:bg-blue-500 dark:text-white",
  normal:"bg-white text-gray-700 dark:bg-zinc-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-zinc-800",
  disabled:"bg-gray-200 dark:bg-zinc-800 text-gray-400 cursor-not-allowed",
};

export default function Pagination({ totalPages, currentPage, setPage }) {
  const handlePrev = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`${styles.button} ${
          currentPage === 1 ? styles.disabled : styles.normal
        } flex items-center gap-1`}
      >
        <ChevronLeft size={16} />
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
        <button
          key={pg}
          onClick={() => setPage(pg)}
          className={`${styles.button} ${
            currentPage === pg ? styles.active : styles.normal
          }`}
        >
          {pg}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`${styles.button} ${
          currentPage === totalPages ? styles.disabled : styles.normal
        } flex items-center gap-1`}
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
