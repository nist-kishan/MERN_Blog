export default function VideoPlayer({ url }) {
  return (
    <div className="w-full aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-black">
      <video
        className="w-full h-full"
        controls
        preload="metadata"
        poster="/thumbnail.jpg"
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
