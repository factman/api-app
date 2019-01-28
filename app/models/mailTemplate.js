/**
 *  @description The mail template model
 *  @author Ifeoluwa Odewale
 */
import mongoose from "mongoose";

const MailTemplateSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Why no name"],
  },
  template: {
    type: String,
    require: [true, "Why no mail template"],
  },
});

const MailTemplate = mongoose.model("MailTemplate", MailTemplateSchema);

export default MailTemplate;
