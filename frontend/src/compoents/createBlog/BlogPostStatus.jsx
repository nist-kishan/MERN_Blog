import { useNavigate } from "react-router-dom";

export default function BlogPostStatus({ isSuccess }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (isSuccess) {
      navigate("/");
    } else {
      window.location.href = "http://localhost:3000/create-blog";
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          {isSuccess ? "Blog Posted Successfully 🎉" : "Blog Posting Failed ❌"}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {isSuccess
            ? "Your blog has been posted. Click below to return to homepage."
            : "Something went wrong while posting your blog. Try again."}
        </p>
        <button
          onClick={handleClick}
          className={`px-6 py-2 text-white rounded-xl font-semibold shadow-md transition ${
            isSuccess
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isSuccess ? "Okay" : "Close"}
        </button>
      </div>
    </div>
  );
}
