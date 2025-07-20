import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import CreateBlog from "./pages/CreateBlog";
import ReadBlog from "./pages/ReadBlog";
import BlogList from "./pages/BlogList";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SavedBlogs from "./pages/SavedBlogs";
import MyBlogs from "./pages/MyBlogs";
import EditBlog from "./pages/EditBlog";
import History from "./pages/BlogHistory";
import AdminPosts from "./pages/AdminPosts";
import AdminSettings from "./pages/AdminSettings";
import AdminUser from "./pages/AdminUser";
import Layout from "./compoents/common/Layout";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:id" element={<ReadBlog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/saved" element={<SavedBlogs />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<AdminSettings />} />
        <Route path="/users" element={<AdminUser />} />
        <Route path="/posts" element={<AdminPosts />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
