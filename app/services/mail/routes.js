/*
* @author 4Dcoder
*/

import express from "express";
import * as mail from "./controller";

const router = express.Router();

// Create a new mail
router.post("/mails", mail.create);

// Retrieve all mail
router.get("/mails", mail.findAll);

// Retrieve a single mail with mailId
router.get("/mails/:mailId", mail.findOne);

// Update a mail with mailId
router.put("/mails/:mailId", mail.update);

// Delete a mail with mailId
router.delete("/mails/:mailId", mail.delete);

export default router;
