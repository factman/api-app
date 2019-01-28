/**
 * @author Odewale Ifeoluwa
 */
import mongoose from "mongoose";

const mailTemplatePlaceholderSchema = mongoose.Schema({
  placeholder: {
    type: [],
    require: [true, "Why no placeholder"],
  },
  color: {
    type: String,
    deafult: "#ffffff",
  },
  background: {
    type: String,
    default: "#0056c1",
  },
  vendorId: {
    type: String,
    require: [true, "Why no vendor ID"],
  },
});

const mailTemplatePlaceholder = mongoose.model("mailTemplatePlaceholder", mailTemplatePlaceholderSchema);

export default mailTemplatePlaceholder;

