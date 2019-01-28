/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
  title: { type: String },
  code: { type: String },
  spec_array: { type: [] },
  vendor_id: { type: Number, required: [true, "Why no Vendor of coupon?"] },
  till: { type: Date },
  standing: {
    type: String,
    enum: ["active", "expired", "trashed"],
    default: "active",
    required: [true, "Why no status?"],
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Coupon = mongoose.model("Coupon", CouponSchema);
export default Coupon;
