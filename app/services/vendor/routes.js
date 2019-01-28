/*
* @author 4Dcoder
*/

import express from "express";
import * as vendor from "./controller";

const router = express.Router();

// Create a new vendor
router.post("/vendors", vendor.create);

// Retrieve all Notes
router.get("/vendors", vendor.findAll);

// Retrieve a single vendor with vendorId
router.get("/vendors/:vendorId", vendor.findOne);

// Update a vendor with vendorId
router.put("/vendors/:vendorId", vendor.update);

// Delete a vendor with vendorId
router.delete("/vendors/:vendorId", vendor.delete);

export default router;
