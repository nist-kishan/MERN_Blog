import mongoose from "mongoose";

export function response(success, statusCode, message, data) {
  return {
    success,
    statusCode,
    message: message || "",
    data: data ?? undefined,
  };
}

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const createDocument = async (Model, data) => {
  try {
    const doc = new Model(data);
    const savedDoc = await doc.save();
    return savedDoc;
  } catch (error) {
    throw new Error(`Create failed: ${error.message}`);
  }
};

// Find a document by ID with optional population
export const findById = async (Model, id, populateOptions = []) => {
  try {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid ID format");
    }

    let query = Model.findById(id);
    populateOptions.forEach((pop) => {
      query = query.populate(pop);
    });

    return await query.exec();
  } catch (error) {
    throw new Error(`Find by ID failed: ${error.message}`);
  }
};

// Find all documents with optional filters, sorting, population
export const findAll = async (
  Model,
  filter = {},
  options = {}
) => {
  try {
    const {
      sort = {},
      populate = [],
      skip = 0,
      limit = 0,
    } = options;

    let query = Model.find(filter).sort(sort).skip(skip).limit(limit);

    populate.forEach((pop) => {
      query = query.populate(pop);
    });

    return await query.exec();
  } catch (error) {
    throw new Error(`Find all failed: ${error.message}`);
  }
};

// Update a document by ID
export const updateById = async (Model, id, updateData) => {
  try {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid ID format");
    }

    const updated = await Model.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return updated;
  } catch (error) {
    throw new Error(`Update failed: ${error.message}`);
  }
};

// Soft delete a document by ID (sets isDeleted to true)
export const softDeleteById = async (Model, id) => {
  try {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid ID format");
    }

    const softDeleted = await Model.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    return softDeleted;
  } catch (error) {
    throw new Error(`Soft delete failed: ${error.message}`);
  }
};

// Permanently delete a document by ID
export const deleteById = async (Model, id) => {
  try {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid ID format");
    }

    return await Model.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Delete failed: ${error.message}`);
  }
};
