/*
* @author 4Dcoder
*/

import mongoose from "mongoose";
import { randomNonce } from "./../../services/helpers";

const AdminSchema = new mongoose.Schema({
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
  role: { type: String, default: "" },
  last_access: {
    type: Array,
    default: [{ accessDate: "", ipAddress: "" }],
  },
  fullname: { type: String, default: "" },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    default: "",
  },
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
