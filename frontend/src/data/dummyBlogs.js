const dummyBlogs = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post Title ${i + 1}`,
  author: `Author ${i % 5 + 1}`,
  category: ["Tech", "Lifestyle", "Health", "Education", "Finance"][i % 5],
  date: new Date(Date.now() - i * 86400000).toISOString(), // dates from today backward
  likes: Math.floor(Math.random() * 200),
  dislikes: Math.floor(Math.random() * 20),
  coverImage: `https://picsum.photos/id/${i + 10}/600/400`,
  excerpt: `This is a short excerpt for blog post ${i + 1}. Discover more insights inside.`,
  content: `
## Blog Post ${i + 1}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu erat lacus, consectetur malesuada metus.

### Section Heading

Quisque non tempor leo. Morbi bibendum eget lectus ac pretium. Integer non turpis eu odio scelerisque eleifend.
`,
  comments: Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, j) => ({
    name: `Commenter ${j + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${(j + 10 + i) % 70}`,
    date: new Date(Date.now() - j * 3600000).toISOString(),
    text: `This is comment ${j + 1} on blog ${i + 1}.`,
  })),
}));

export default dummyBlogs;
