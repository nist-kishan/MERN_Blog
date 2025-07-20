export default function BlogContent({ content }) {
  return (
    <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
      {content.split("\n").map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
