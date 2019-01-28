/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Why no role name ?"] },
  permission: { type: [], required: [true, "Why no Permission?"] },
  description: { type: String, required: [true, "Why no Description ?"] },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Role = mongoose.model("Role", RoleSchema);
export default Role;
