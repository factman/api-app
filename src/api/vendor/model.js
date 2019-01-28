/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const randomNonce = () => Math.floor(Math.random() * 1000000);

const VendorSchema = new mongoose.Schema({
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
    default: "",
  },
  business_name: {
    type: String,
    unique: true,
    required: [false, "What is your unique Shop name?"],
    default: "",
  },
  currency_id: { type: String, required: [false, "Why no Company?"], default: "" },
  language: { type: String, default: "" },
  fullname: { type: String, default: "" },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [false, "Why no email?"],
    default: "",
  },
  password: { type: String, required: [false, "Why no Password?"], default: "" },
  tagline: { type: String, default: "" },
  address: { type: String, required: [false, "Why no Address?"], default: "" },
  details: { type: [], default: [] },
  facebook: { type: String, default: "" },
  skype: { type: String, default: "" },
  google_plus: { type: String, default: "" },
  twitter: { type: String, default: "" },
  youtube: { type: String, default: "" },
  pinterest: { type: String, default: "" },
  phone: { type: String, required: [false, "Why no Phone?"], default: "" },
  tag: { type: String, required: [false, "Why no Tag?"], default: "" },
  description: { type: String, required: [false, "Why no Description?"], default: "" },
  lat_lang: { type: String, required: [false, "Why no Lat_lang?"], default: "" },
  country: { type: String, required: [false, "Why no Country?"], default: "" },
  city: { type: String, required: [false, "Why no City?"], default: "" },
  zip: { type: String, required: [false, "Why no Zip?"], default: "" },
  state: { type: String, required: [false, "Why no State?"], default: "" },
  theme: { type: String, default: "" },
  logo: { type: String, default: "" },
  banner: { type: String, default: "" },
  home_page_style: { type: String, default: "" },
  product_page_style: { type: String, default: "" },
  product_detail_page_style: { type: String, default: "" },
  profile_page_style: { type: String, default: "" },
  blog_page_style: { type: String, default: "" },
  mail_page_style: { type: String, default: "" },
  invoice_page_style: { type: String, default: "" },
  ticket_page_style: { type: String, default: "" },
  view_count: { type: Number, default: 1 },
  last_access: { type: [{ date: { type: Date }, ip: { type: String } }] },
  standing: {
    type: String,
    enum: ["active", "unverified", "suspended", "trashed"],
    default: "unverified",
    required: [false, "Why no status?"],
  },
  updated: { type: Date, default: Date.now },

}, {
  timestamps: true,
});

const Vendor = mongoose.model("Vendor", VendorSchema);
export default Vendor;
