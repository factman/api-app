/*
* @author 4Dcoder
*/

import express from "express";
import * as language from "./controller";

const router = express.Router();

// Create a new language
router.post("/languages", language.create);

// Retrieve all Notes
router.get("/languages", language.findAll);

// Retrieve a single language with languageId
router.get("/languages/:languageId", language.findOne);

// Update a language with languageId
router.put("/languages/:languageId", language.update);

// Delete a language with languageId
router.delete("/languages/:languageId", language.delete);

export default router;
