/*
* @author 4Dcoder
*/

import express from "express";
import * as subscribe from "./controller";

const router = express.Router();

// Create a new subscribe
router.post("/subscribes", subscribe.create);

// Retrieve all Notes
router.get("/subscribes", subscribe.findAll);

// Retrieve a single subscribe with subscribeId
router.get("/subscribes/:subscribeId", subscribe.findOne);

// Update a subscribe with subscribeId
router.put("/subscribes/:subscribeId", subscribe.update);

// Delete a subscribe with subscribeId
router.delete("/subscribes/:subscribeId", subscribe.delete);

export default router;
