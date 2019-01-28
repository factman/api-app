/*
* @author 4Dcoder
*/

import express from "express";
import * as brand from "./controller";

const router = express.Router();

// Create a new brand
router.post("/brands", brand.create);

// Retrieve all Notes
router.get("/brands", brand.findAll);

// Retrieve a single brand with brandId
router.get("/brands/:brandId", brand.findOne);

// Update a brand with brandId
router.put("/brands/:brandId", brand.update);

// Delete a brand with brandId
router.delete("/brands/:brandId", brand.delete);

export default router;
