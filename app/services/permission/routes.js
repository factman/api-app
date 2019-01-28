/*
* @author 4Dcoder
*/

import express from "express";
import * as permission from "./controller";

const router = express.Router();

// Create a new permission
router.post("/permissions", permission.create);

// Retrieve all Notes
router.get("/permissions", permission.findAll);

// Retrieve a single permission with permissionId
router.get("/permissions/:permissionId", permission.findOne);

// Update a permission with permissionId
router.put("/permissions/:permissionId", permission.update);

// Delete a permission with permissionId
router.delete("/permissions/:permissionId", permission.delete);

export default router;
