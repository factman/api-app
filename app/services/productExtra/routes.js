/*
* @author 4Dcoder
*/

import express from "express";
import * as productExtra from "./controller";

const router = express.Router();

// Create a new productExtra
router.post("/productExtras", productExtra.create);

// Retrieve all Notes
router.get("/productExtras", productExtra.findAll);

// Retrieve a single productExtra with productExtraId
router.get("/productExtras/:productExtraId", productExtra.findOne);

// Update a productExtra with productExtraId
router.put("/productExtras/:productExtraId", productExtra.update);

// Delete a productExtra with productExtraId
router.delete("/productExtras/:productExtraId", productExtra.delete);

export default router;
