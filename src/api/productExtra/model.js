/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const ProductExtraSchema = new mongoose.Schema({
  product_id: { type: String, required: [true, "Why no product?"] },
  vendor_id: { type: String, required: [true, "Why no vendor?"] },
  name: { type: String, required: [true, "Why no Extra field name?"] },
  value: { type: String, required: [true, "Why no value?"] },
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

const ProductExtra = mongoose.model("ProductExtra", ProductExtraSchema);
export default ProductExtra;
