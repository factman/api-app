/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  kind: {
    type: String,
    enum: ["arbitration", "chat", "contact", "ticket"],
    required: [true, "Why no communication type?"],
  },
  message_session: { type: String },
  message_between: {
    type: String,
    enum: ["visitor_vendor", "customer_vendor", "customer_admin", "vendor_admin"],
    required: [true, "Why no communication party?"],
  },
  visitor_name: { type: String },
  visitor_email: { type: String },
  subject: { type: String },
  message: { type: String },
  customer_id: { type: String },
  vendor_id: { type: String },
  admin_id: { type: String },
  sent_by: {
    type: String,
    enum: ["visitor", "customer", "vendor", "admin"],
    required: [true, "Why no sender?"],
  },
  ticket_status: {
    type: String,
    enum: ["pending", "resolved", "arbitration"],
    default: "pending",
  },
  standing: {
    type: String,
    enum: ["read", "unread", "trashed"],
    default: "unread",
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Message = mongoose.model("Message", MessageSchema);
export default Message;
