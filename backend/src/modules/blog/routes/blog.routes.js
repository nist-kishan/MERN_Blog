import { Router } from "express";
import {newBlog,
    blogList,
    blogById,
    updateBlog,
    deleteBlog
} from "../controller/blog.controller.js";

const blogRouter = Router();

blogRouter.post("/create", newBlog);
blogRouter.get("/list", blogList);
blogRouter.get("/view/:id", blogById);
blogRouter.put("/edit/:id", updateBlog);
blogRouter.delete("/delete/:id", deleteBlog);

export default blogRouter;
