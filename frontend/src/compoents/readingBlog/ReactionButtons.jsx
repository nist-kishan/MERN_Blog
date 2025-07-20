import { ThumbsUp, ThumbsDown } from "lucide-react";

export default function ReactionButtons({ likes, setLikes, dislikes, setDislikes }) {
  return (
    <div className="flex gap-4 items-center text-sm">
      <button
        className="flex items-center gap-1 text-green-600 hover:text-green-800"
        onClick={() => setLikes((prev) => prev + 1)}
      >
        <ThumbsUp size={18} /> {likes}
      </button>
      <button
        className="flex items-center gap-1 text-red-600 hover:text-red-800"
        onClick={() => setDislikes((prev) => prev + 1)}
      >
        <ThumbsDown size={18} /> {dislikes}
      </button>
    </div>
  );
}
