import mongoose from 'mongoose';
import slugify from 'slugify';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    required: true
  },

  images: {
    type: [String],
    default: []
  },

  video: {
    type: [String],
    default: null
  },

  overview: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  scheduledBlog: {
    type: Date,
    default: null
  },

  isPost: {
    type: Boolean,
    default: false
  },

  isUser: {
    type: Boolean,
    default: true
  },

  blogRole: {
    type: String,
    enum: ['public', 'followers', 'private'],
    default: 'public'
  },

  tags: {
    type: [String],
    default: []
  },

  publishedAt: {
    type: Date,
    default: null
  },

  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],

  slug: {
    type: String,
    required: true,
    unique: true
  },

  likes: {
    type: Number,
    default: 0
  },

  views: {
    type: Number,
    default: 0
  },

  readingTime: {
    type: Number,
    default: 0
  },

  isFeatured: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    enum: ['draft', 'published', 'trashed'],
    default: 'draft'
  },

  reportCount: {
    type: Number,
    default: 0
  },

  language: {
    type: String,
    default: 'en'
  },

  meta: {
    title: { type: String, default: '' },
    description: { type: String, default: '' }
  }

}, { timestamps: true });

BlogSchema.pre('validate', function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.description) {
    const words = this.description.trim().split(/\s+/).length;
    this.readingTime = Math.ceil(words / 200);
  }

  next();
});

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;

