/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const ArbitrationSchema = new mongoose.Schema({
  order_id: { type: Number, required: [true, "Why no sales order?"] },
  vendor_id: { type: Number, required: [true, "Why no Vendor?"] },
  customer_id: { type: Number, required: [true, "Why no Customer?"] },
  amount: { type: Number, required: [true, "Why no Amount?"] },
  customer_complaint: { type: String, required: [true, "Why no Customer complaint?"] },
  vendor_complaint: { type: String, required: [true, "Why no Vendor complaint?"] },
  arbitration_status: { type: String, required: [true, "Why no Arbitration status?"] },
  arbiter: { type: String },
  verdict: { type: String },
  standing: {
    type: String,
    enum: ["pending", "resolved", "trashed"],
    default: "pending",
    required: [true, "Why no status?"],
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Arbitration = mongoose.model("Arbitration", ArbitrationSchema);
export default Arbitration;
