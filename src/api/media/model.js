/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  media_type: { type: String, required: [true, "Why no media type?"] },
  vendor_id: { type: String, required: [true, "Why no vendor ?"] },
  purpose: {
    type: String,
    enum: ["product", "banner", "slide", "profile", "background"],
    required: [true, "Why no purpose?"],
  },
  subject: {
    type: [{ product: [] }, { stock: [] }, { vendor: [] }, { brand: [] }, { category: [] }],
    required: [true, "Why no purpose?"],
  },
  page: { type: String, required: [true, "Why no page?"] },
  place: { type: String, required: [true, "Why no place?"] },
  num: { type: String, required: [true, "Why no num?"] },
  status: { type: String, required: [true, "Why no status?"] },
  url: { type: String, required: [true, "Why no url?"] },
  title: { type: String, required: [true, "Why no title?"] },
  description: { type: String, required: [true, "Why no description?"] },
  style: { type: String, required: [true, "Why no style?"] },
  standing: {
    type: String,
    enum: ["active", "suspended", "trashed"],
    default: "active",
    required: [true, "Why no status?"],
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Media = mongoose.model("Media", MediaSchema);
export default Media;
