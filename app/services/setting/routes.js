/*
* @author 4Dcoder
*/

import express from "express";
import * as setting from "./controller";

const router = express.Router();

// Create a new setting
router.post("/settings", setting.create);

// Retrieve all Notes
router.get("/settings", setting.findAll);

// Retrieve a single setting with settingId
router.get("/settings/:settingId", setting.findOne);

// Update a setting with settingId
router.put("/settings/:settingId", setting.update);

// Delete a setting with settingId
router.delete("/settings/:settingId", setting.delete);

export default router;
