import Comment from "./comment.model.js";
import mongoose from "mongoose";


export const createCommentService = async ({ userId, blogId, text, parentId }) => {
  if (!userId || !blogId || !text?.trim()) {
    throw new Error("Missing required fields: userId, blogId, or text.");
  }

  const newComment = new Comment({
    user: userId,
    blog: blogId,
    text,
  });

  const savedComment = await newComment.save();

  // If it's a reply, push this comment to parent's replies
  if (parentId && mongoose.Types.ObjectId.isValid(parentId)) {
    await Comment.findByIdAndUpdate(
      parentId,
      { $push: { replies: savedComment._id } },
      { new: true }
    );
  }

  return savedComment;
};

// READ all comments for a blog with user & replies populated
export const getCommentsByBlogService = async (blogId) => {
  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    throw new Error("Invalid blog ID.");
  }

  const comments = await Comment.find({ blog: blogId, parent: null, isDeleted: false })
    .populate("user", "name username profilePic")
    .populate({
      path: "replies",
      match: { isDeleted: false },
      populate: { path: "user", select: "name username profilePic" },
      options: { sort: { createdAt: 1 } },
    })
    .sort({ createdAt: -1 })
    .lean();

  return comments;
};

// UPDATE comment text
export const updateCommentService = async (commentId, text) => {
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new Error("Invalid comment ID.");
  }

  const updated = await Comment.findByIdAndUpdate(
    commentId,
    {
      text,
      isEdited: true,
      updatedAt: new Date(),
    },
    { new: true }
  );

  if (!updated) {
    throw new Error("Comment not found or update failed.");
  }

  return updated;
};

// SOFT DELETE a comment
export const deleteCommentService = async (commentId) => {
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new Error("Invalid comment ID.");
  }

  const deleted = await Comment.findByIdAndUpdate(
    commentId,
    { isDeleted: true },
    { new: true }
  );

  if (!deleted) {
    throw new Error("Comment not found or delete failed.");
  }

  return deleted;
};
