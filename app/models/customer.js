/**
 * @author 4Dcoder
 * @co author Ifeoluwa Odewale
 */

import mongoose from "mongoose";

const randomNonce = () => Math.floor(Math.random() * 1000000);

const CustomerSchema = new mongoose.Schema({
  nonce: {
    type: Number,
    default: randomNonce(),
    required: [true, "Why no authentication nonce?"],
  },
  publicAddress: {
    type: String,
    unique: true,
    required: [true, "Why no MetaMask address?"],
    // validate: { isLowercase: true },
  },
  username: { type: String },
  language: { type: String },
  gender: { type: String },
  password: { type: String },
  photo: { type: String },
  profile: { type: String },
  downloads: { type: Number, default: 0 },
  agent_status: { type: String },
  first_name: { type: String },
  middle_name: { type: String },
  last_name: { type: String },
  organization: { type: String },
  address: { type: String },
  city: { type: String },
  zip: { type: String },
  postal_code: { type: String },
  lang_lat: { type: String },
  state: { type: String },
  country: { type: String },
  phone: { type: String },
  email: { type: String, unique: true },
  last_access: { type: [] },
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

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;
