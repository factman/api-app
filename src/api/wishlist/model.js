/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Why no Name?"] },
  customer_id: { type: String, required: [true, "Why no Customer?"] },
  product_array: { type: [], default: [] },
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

const Wishlist = mongoose.model("Wishlist", WishlistSchema);
export default Wishlist;
