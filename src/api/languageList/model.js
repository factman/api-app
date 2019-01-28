/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const LanguageListSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Why no name?"] },
  db_field: { type: String, required: [true, "Why no langauge table field name?"] },
  icon: { type: String, required: [true, "Why no image?"] },
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

const LanguageList = mongoose.model("LanguageList", LanguageListSchema);
export default LanguageList;
