/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema({
  email: { type: String },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    default: "weekly",
    required: [true, "Why no sender?"],
  },
  interest: { type: [], default: [] },
  standing: {
    type: String,
    enum: ["subscribed", "unsubscribed", "trashed"],
    default: "subscribed",
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Subscriber = mongoose.model("Subscriber", SubscriberSchema);
export default Subscriber;
