/*
* @author 4Dcoder
*/

import express from "express";
import * as template from "./controller";

const router = express.Router();

// Create a new template
router.post("/templates", template.create);

// Retrieve all Notes
router.get("/templates", template.findAll);

// Retrieve a single template with templateId
router.get("/templates/:templateId", template.findOne);

// Update a template with templateId
router.put("/templates/:templateId", template.update);

// Delete a template with templateId
router.delete("/templates/:templateId", template.delete);

export default router;
