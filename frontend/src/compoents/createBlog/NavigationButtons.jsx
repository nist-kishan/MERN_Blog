export default function NavigationButtons({ currentPage, nextPage, prevPage }) {
  return (
    <div className="flex justify-between items-center mt-6 px-6">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="px-6 py-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50 transition hover:bg-gray-400 dark:hover:bg-gray-600"
      >
        Back
      </button>

      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Step {currentPage === 4 ? "P" : currentPage} of 4
      </span>

      {currentPage < 4 ? (
        <button
          onClick={nextPage}
          className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition shadow"
        >
          Next
        </button>
      ) : (
        <div />
      )}
    </div>
  );
}
