import Comment from "../model/comment.model.js"
import mongoose from "mongoose";
import {
  createDocument,
  findAll,
  updateById,
  softDeleteById,
} from "../../../utils.js";

export const createCommentService = async ({
  user,
  blog,
  text,
  parent=null,
}) => {
  if (!user || !blog || !text?.trim()) {
    throw new Error("Missing required fields: userId, blogId, or text.");
  }

  const newCommentData = {
    user: user,
    blog: blog,
    text,
    ...(parent && mongoose.Types.ObjectId.isValid(parent)
      ? { parent: parent }
      : {}),
  };

  const savedComment = await createDocument(Comment, newCommentData);

  if (parent && mongoose.Types.ObjectId.isValid(parent)) {
    await updateById(Comment, parent, {
      $push: { replies: savedComment._id },
    });
  }

  return savedComment;
};

export const getCommentsByBlogService = async (blogId) => {
  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    throw new Error("Invalid blog ID.");
  }

  const filter = {
    blog: blogId,
    parent: null,
    isDeleted: false,
  };

  const options = {
    sort: { createdAt: -1 },
    populate: [
      { path: "user", select: "name username profilePic" },
      {
        path: "replies",
        match: { isDeleted: false },
        populate: { path: "user", select: "name username profilePic" },
        options: { sort: { createdAt: 1 } },
      },
    ],
  };

  const comments = await findAll(Comment, filter, options);
  return comments;
};

// UPDATE comment
export const updateCommentService = async (commentId, text) => {
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new Error("Invalid comment ID.");
  }

  if (!text?.trim()) {
    throw new Error("Updated text cannot be empty.");
  }

  const updateData = {
    text,
    isEdited: true,
    updatedAt: new Date(),
  };

  const updated = await updateById(Comment, commentId, updateData);

  if (!updated) {
    throw new Error("Comment not found or update failed.");
  }

  return updated;
};

// SOFT DELETE comment
export const deleteCommentService = async (commentId) => {
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new Error("Invalid comment ID.");
  }

  const deleted = await softDeleteById(Comment, commentId);

  if (!deleted) {
    throw new Error("Comment not found or delete failed.");
  }

  return deleted;
};
