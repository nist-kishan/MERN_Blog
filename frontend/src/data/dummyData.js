export const categories = Array.from({ length: 100 }, (_, i) => `Category ${i + 1}`);

export const blogsData = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}`,
  category: categories[i % 100],
  date: new Date(Date.now() - i * 86400000),
  likes: Math.floor(Math.random() * 100),
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  image: `https://picsum.photos/seed/blog${i + 1}/400/200`,
}));
