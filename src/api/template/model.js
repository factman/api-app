/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Why no template name"] },
  page: {
    type: String,
    enum: ["theme", "home", "profile", "product", "details", "invoice", "ticket"],
    required: [true, "Why no page type?"],
  },
  icon: { type: String, required: [true, "Why no template image"] },
  style: { type: String, required: [true, "Why no stylesheet"] },
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

const Template = mongoose.model("Template", TemplateSchema);
export default Template;
