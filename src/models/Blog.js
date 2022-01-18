import mongoose from 'mongoose';

// Blog Posts
export const BlogPost = mongoose.model('blogPost', {
  isPublished: Boolean,
  title: String,
  description: String,
  author: String,
  time: Number,
  date: String,
  content: String,
  image: String,
}, 'blogPosts');

// Draft Blog Posts
export const DraftBlogPost = mongoose.model('draftBlogPost', {
  isPublished: Boolean,
  title: String,
  description: String,
  author: String,
  time: Number,
  date: String,
  content: String,
  image: String,
}, 'draftBlogPosts');