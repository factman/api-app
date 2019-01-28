/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  vendor_id: { type: String, required: [true, "Why no vendor id?"] },
  product_id: { type: String, required: [true, "Why no product id?"] },
  order_num: { type: String, required: [true, "Why no order number?"] },
  kind: { type: String, enum: ["add", "destroy"], required: [true, "Why no kind?"] },
  quantity: { type: Number, required: [true, "Why no quantity?"] },
  available: { type: Number, default: 0 },
  unit_cost: { type: Number, required: [true, "Why no unit cost?"] },
  unit_price: { type: Number, required: [true, "Why no unit price?"] },
  description: { type: String, required: [true, "Why no description?"] },
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

const Stock = mongoose.model("Stock", StockSchema);
export default Stock;
