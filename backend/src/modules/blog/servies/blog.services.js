import { response } from "../../../utils.js";
import Blog from "../model/blog.model.js";
import mongoose from "mongoose";
import User from "../../user/model/user.model.js"

import {
  createDocument,
  findById,
  findAll,
  updateById,
  deleteById,
} from "../../../utils.js";

export const newBlogHandler = async (data) => {
  try {
    if (!data.title) {
      return response(false, 400, "Title is required");
    } else if (!data.overview) {
      return response(false, 400, "Overview is required");
    } else if (!data.description) {
      return response(false, 400, "Content is required");
    } else if (!data.user) {
      return response(false, 400, "Author is required");
    }

    const createdBlog = await createDocument(Blog, data);
    return response(true, 201, "Blog created successfully", createdBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    return response(false, 500, "Internal Server Error");
  }
};


export const getBlogHandler = async (
  page = 1,
  limit = 10,
  rawFilter = "{}"
) => {
  try {
    const parsedFilter = typeof rawFilter === "string" ? JSON.parse(rawFilter) : rawFilter;

    const {
      search = "",
      category = [],
      sortType = "latest",
      user: userFromFilter = null,
    } = parsedFilter;

    const filter = {};

    if (userFromFilter) {
      filter.user = new mongoose.Types.ObjectId(userFromFilter);
    }

    if (search?.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [
        { title: regex },
        { overview: regex },
        { category: regex },
      ];
    }

    if (Array.isArray(category) && category.length > 0) {
      filter.category = { $in: category };
    }

    const sortOptions = {
      latest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      popular: { views: -1 },
      alphabetical: { title: 1 },
    };

    const sort = sortOptions[sortType] || sortOptions.latest;
    const skip = (page - 1) * limit;

    const [blogs, totalBlogs] = await Promise.all([
      findAll(Blog, filter, {
        sort,
        skip,
        limit,
        populate: [
          {
            path: "user",
            select: "name username profilePic role slug isVerified",
          },
        ],
      }),
      Blog.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalBlogs / limit);

    return response(true, 200, "Blogs fetched successfully", {
      blogs,
      totalBlogs,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return response(false, 500, "Error fetching blogs", error.message);
  }
};

export const getBlogByIDHandler = async (id) => {
  try {
    const populateOptions = [
      {
        path: "user",
        select: "name username profilePic role slug isVerified",
      },
    ];

    const blog = await findById(Blog, id, populateOptions);
    

    if (!blog) {
      return response(false, 404, "Blog not found");
    }

    return response(true, 200, "Blog fetched successfully", blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return response(false, 500, "Internal Server Error");
  }
};

export const updateBlogHandler = async (id, data) => {
  try {
    const updatedBlog = await updateById(Blog, id, data);
    if (!updatedBlog) {
      return response(false, 404, "Blog not found");
    }
    return response(true, 200, "Blog updated successfully", updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return response(false, 500, "Internal Server Error");
  }
};

export const deleteBlogHandler = async (id) => {
  try {
    const deletedBlog = await deleteById(Blog, id);
    if (!deletedBlog) {
      return response(false, 404, "Blog not found");
    }
    return response(true, 200, "Blog deleted successfully");
  } catch (error) {
    console.error("Error deleting blog:", error);
    return response(false, 500, "Internal Server Error");
  }
};
