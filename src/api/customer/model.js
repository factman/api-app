/*
* @author 4Dcoder
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
    lowercase: true,
    required: [true, "Why no MetaMask address?"],
  },
  username: { type: String, default: "" },
  currency_id: { type: String, default: "" },
  wishlist: { type: [] },
  cart: { type: [] },
  language: { type: String, default: "" },
  gender: { type: String, default: "" },
  password: { type: String, default: "" },
  photo: { type: String, default: "" },
  profile: { type: String, default: "" },
  fullname: { type: String, default: "" },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  zip: { type: String, default: "" },
  state: { type: String, default: "" },
  country: { type: String, default: "" },
  phone: { type: String, default: "" },
  email: { type: String, unique: true, default: "" },
  last_access: { type: [] },
  standing: {
    type: String,
    enum: ["active", "unverified", "suspended", "trashed"],
    default: "active",
    required: [true, "Why no status?"],
  },
  updated: { type: Date, default: Date.now },

}, {
  timestamps: true,
});

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;
