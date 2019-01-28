/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const MailSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Why no name?"] },
  mail_title: { type: String, required: [true, "Why no mail title?"] },
  mail_subject: { type: String, required: [true, "Why no mail subject?"] },
  mail_body: { type: String, required: [true, "Why no mail body?"] },
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

const Mail = mongoose.model("Mail", MailSchema);
export default Mail;
