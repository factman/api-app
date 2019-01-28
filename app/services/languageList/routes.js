/*
* @author 4Dcoder
*/

import express from "express";
import * as languageList from "./controller";

const router = express.Router();

// Create a new languageList
router.post("/languageLists", languageList.create);

// Retrieve all Notes
router.get("/languageLists", languageList.findAll);

// Retrieve a single languageList with languageListId
router.get("/languageLists/:languageListId", languageList.findOne);

// Update a languageList with languageListId
router.put("/languageLists/:languageListId", languageList.update);

// Delete a languageList with languageListId
router.delete("/languageLists/:languageListId", languageList.delete);

export default router;
