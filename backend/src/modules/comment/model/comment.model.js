import mongoose,{Schema} from "mongoose";

const CommentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },

  text: {
    type: String,
    required: true,
    trim: true
  },

  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],

  isEdited: {
    type: Boolean,
    default: false
  },

  isDeleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;

