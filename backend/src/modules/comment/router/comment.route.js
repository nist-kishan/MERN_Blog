import express from "express";
import {
  createCommentController,
  getCommentsByBlogController,
  updateCommentController,
  deleteCommentController,
} from "../controller/comment.controller.js";

const commentRouter = express.Router();

commentRouter.post("/", createCommentController);
commentRouter.get("/:blogId", getCommentsByBlogController);
commentRouter.put("/:commentId", updateCommentController);
commentRouter.delete("/:commentId", deleteCommentController);

export default commentRouter;
