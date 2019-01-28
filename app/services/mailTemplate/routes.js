/**
 * @description main mail template router
 * @author Odewalee Ifeoluwa
 */
import express from "express";
import * as mailTemplate from "./controller";

const router = express.Router();

// Create a new mailTemplate
router.post("/mailTemplates", mailTemplate.create);

// Retrieve all mail
router.get("/mailTemplates", mailTemplate.findAll);

// Retrieve a single mail with mailId
router.get("/mailTemplates/:mailTemplateId", mailTemplate.findOne);

// Update a mail with mailTemplateId
// router.put("/mailTemplates/:mailTemplateId", mailTemplate.update);

// Delete a mail with mailTemplateId
router.delete("/mailTemplates/:mailTemplateId", mailTemplate.delete);

export default router;
