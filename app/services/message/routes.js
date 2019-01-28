/*
* @author 4Dcoder
*/

import express from "express";
import * as message from "./controller";

const router = express.Router();

// Create a new message
router.post("/messages", message.create);

// Retrieve all Notes
router.get("/messages", message.findAll);

// Retrieve a single message with messageId
router.get("/messages/:messageId", message.findOne);

// Update a message with messageId
router.put("/messages/:messageId", message.update);

// Delete a message with messageId
router.delete("/messages/:messageId", message.delete);

export default router;
