/*
* @author 4Dcoder
*/

import express from "express";
import * as blog from "./controller";

const router = express.Router();

// Create a new blog
router.post("/blogs", blog.create);

// Retrieve all Notes
router.get("/blogs", blog.findAll);

// Retrieve a single blog with blogId
router.get("/blogs/:blogId", blog.findOne);

// Update a blog with blogId
router.put("/blogs/:blogId", blog.update);

// Delete a blog with blogId
router.delete("/blogs/:blogId", blog.delete);

export default router;
