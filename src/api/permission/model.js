/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Why no Permission name ?"] },
  codename: { type: String, required: [true, "Why no Permission codename ?"] },
  parent_status: { type: String, required: [true, "Why no Parent status ?"] },
  description: { type: String, required: [true, "Why no Description ?"] },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Permission = mongoose.model("Permission", PermissionSchema);
export default Permission;
