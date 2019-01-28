/*
* @author 4Dcoder
*/

import express from "express";
import * as admin from "./controller";

const router = express.Router();

// Create a new admin
router.post("/admins", admin.create);

// Retrieve all Notes
router.get("/admins", admin.findAll);

// Retrieve a single admin with adminId
router.get("/admins/:adminId", admin.findOne);

// Update a admin with adminId
router.put("/admins/:adminId", admin.update);

// Delete a admin with adminId
router.delete("/admins/:adminId", admin.delete);

export default router;
