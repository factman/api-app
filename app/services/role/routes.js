/*
* @author 4Dcoder
*/

import express from "express";
import * as role from "./controller";

const router = express.Router();

// Create a new role
router.post("/roles", role.create);

// Retrieve all Notes
router.get("/roles", role.findAll);

// Retrieve a single role with roleId
router.get("/roles/:roleId", role.findOne);

// Update a role with roleId
router.put("/roles/:roleId", role.update);

// Delete a role with roleId
router.delete("/roles/:roleId", role.delete);

export default router;
