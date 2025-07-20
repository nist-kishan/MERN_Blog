export default function CoverImage({ src }) {
  return (
    <img
      src={src}
      alt="cover"
      className="rounded-xl shadow-lg w-full max-h-[400px] object-cover"
    />
  );
}
