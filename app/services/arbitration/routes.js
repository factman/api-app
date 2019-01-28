/*
* @author 4Dcoder
*/

import express from "express";
import * as arbitration from "./controller";

const router = express.Router();

// Create a new arbitration
router.post("/arbitrations", arbitration.create);

// Retrieve all Notes
router.get("/arbitrations", arbitration.findAll);

// Retrieve a single arbitration with arbitrationId
router.get("/arbitrations/:arbitrationId", arbitration.findOne);

// Update a arbitration with arbitrationId
router.put("/arbitrations/:arbitrationId", arbitration.update);

// Delete a arbitration with arbitrationId
router.delete("/arbitrations/:arbitrationId", arbitration.delete);

export default router;
