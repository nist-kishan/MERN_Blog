import {
  createCommentService,
  getCommentsByBlogService,
  updateCommentService,
  deleteCommentService,
} from "../services/comment.service.js";
import { response } from "../../../utils.js";

// ✅ CREATE a comment or reply
export const createCommentController = async (req, res, next) => {
  try {
    const { user, blog, text, parent } = req.body;
    const result = await createCommentService({
      user,
      blog,
      text,
      parent,
    });

    return res
      .status(201)
      .json(response(true, 201, "Comment created successfully", result));
  } catch (err) {
    next(err);
  }
};

// ✅ GET all comments for a blog
export const getCommentsByBlogController = async (req, res, next) => {
  try {
    const { blogId } = req.params;

    const result = await getCommentsByBlogService(blogId);

    return res
      .status(200)
      .json(response(true, 200, "Comments fetched successfully", result));
  } catch (err) {
    next(err);
  }
};

// ✅ UPDATE a comment
export const updateCommentController = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const result = await updateCommentService(commentId, text);

    return res
      .status(200)
      .json(response(true, 200, "Comment updated successfully", result));
  } catch (err) {
    next(err);
  }
};

// ✅ SOFT DELETE a comment
export const deleteCommentController = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const result = await deleteCommentService(commentId);

    return res
      .status(200)
      .json(response(true, 200, "Comment deleted successfully", result));
  } catch (err) {
    next(err);
  }
};
