/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const randomNonce = () => Math.floor(Math.random() * 1000000);

const AdminSchema = new mongoose.Schema({
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
  name: { type: String, required: [true, "Why no Name?"] },
  phone: { type: String, required: [true, "Why no Phone?"] },
  address: { type: String, required: [true, "Why no Address?"] },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Why no email?"],
  },
  password: { type: String, required: [true, "Why no Password?"] },
  role: { type: String, required: [true, "Why no Role?"] },
  last_access: { type: [] },
  standing: {
    type: String,
    enum: ["active", "suspended", "trashed"],
    default: "active",
    required: [true, "Why no status?"],
  },
  updated: { type: Date, default: Date.now },
}, { timestamps: true });

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
