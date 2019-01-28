/*
* @author 4Dcoder
*/

import express from "express";
import * as category from "./controller";


const router = express.Router();

// Create a new category
router.post("/categories", category.create);

// Retrieve all Notes
router.get("/categories", category.findAll);

// Retrieve a single category with categoryId
router.get("/categories/:categoryId", category.findOne);

// Update a category with categoryId
router.put("/categories/:categoryId", category.update);

// Delete a category with categoryId
router.delete("/categories/:categoryId", category.delete);

export default router;
