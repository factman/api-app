/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const CurrencySchema = new mongoose.Schema({
  name: { type: String, required: [true, "Why no name?"] },
  code: { type: String, required: [true, "Why no code?"] },
  description: { type: String },
  kind: { type: String, enum: ["digital", "fiat"], required: [true, "Why no currency type?"] },
  symbol: { type: String, required: [true, "Why no symbol?"] },
  exchange: { type: Number, required: [true, "Why no exchange rate?"] },
  icon: { type: String, default: "" },
  view_count: { type: Number, default: 1 },
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

const Currency = mongoose.model("Currency", CurrencySchema);
export default Currency;
