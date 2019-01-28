/*
* @author Factman60
*/

import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  kind: { type: String, default: "blog" },
  title: { type: String, required: [true, "Why no Title?"] },
  summary: { type: String, required: [true, "Why no Summary?"] },
  author: { type: String, required: [true, "Why no Author?"] },
  content: { type: String, required: [true, "Why no content?"] },
  tag: { type: String, required: [true, "Why no Tag?"] },
  image: { type: [] },
  view_count: { type: Number, default: 1 },
  standing: {
    type: String,
    enum: ["published", "unpublished", "trashed"],
    default: "unpublished",
    required: [true, "Why no publish status?"],
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
