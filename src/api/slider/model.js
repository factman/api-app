/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const SliderSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Why no slider name?"] },
  vendor_id: { type: String, required: [true, "Why no vendor?"] },
  kind: {
    type: String,
    enum: ["image", "text"],
    default: "active",
    required: [true, "Why no Slider type?"],
  },
  elements: {
    type: [],
  },
  place: {
    type: [],
    required: [true, "Why no page and position?"],
  },
  title: { type: String, required: [true, "Why no title?"] },
  style: { type: [] },
  standing: { type: String },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Slider = mongoose.model("Slider", SliderSchema);
export default Slider;
