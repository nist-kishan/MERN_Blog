import {
  newBlogHandler,
  getBlogHandler,
  getBlogByIDHandler,
  updateBlogHandler,
  deleteBlogHandler,
} from "../servies/blog.services.js";

export const newBlog = async (req, res) => {
  try {
    const data = req.body;
    const payload = await newBlogHandler(data);

    res.status(payload.statusCode).json(payload);
  } catch (error) {
    console.error("Error creating new blog:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const blogList = async (req, res) => {
  try {
    const data = req.query;
    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit) || 10;
    const filter=data.filter;
    const payload = await getBlogHandler(page, limit,filter);
    res.status(payload.statusCode).json(payload);
  } catch (error) {
    console.error("Error fetching blog list:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const blogById = async (req, res) => {
  try {
    const id = req.params.id;

    const payload = await getBlogByIDHandler(id);
    res.status(payload.statusCode).json(payload);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const payload = await updateBlogHandler(id, data);
    res.status(payload.statusCode).json(payload);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = await deleteBlogHandler(id);
    res.status(payload.statusCode).json(payload);
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

