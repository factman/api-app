/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  customer_id: { type: Number, required: [true, "Why no Customer?"] },
  subject: {
    type: String,
    enum: ["product", "category", "brand", "vendor", "stock", "order"],
    required: [true, "Why no subject?"],
  },
  subject_id: { type: Number, required: [true, "Why no subject of review?"] },
  comment: { type: String },
  rating: {
    type: String,
    enum: ["1", "2", "3", "4", "5"],
    required: [true, "Why no rating?"],
  },
  standing: {
    type: String,
    enum: ["show", "trashed"],
    default: "show",
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
