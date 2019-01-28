/*
* @author 4Dcoder
*/

import express from "express";
import * as media from "./controller";

const router = express.Router();

// Create a new media
router.post("/medias", media.create);

// Retrieve all Notes
router.get("/medias", media.findAll);

// Retrieve a single media with mediaId
router.get("/medias/:mediaId", media.findOne);

// Update a media with mediaId
router.put("/medias/:mediaId", media.update);

// Delete a media with mediaId
router.delete("/medias/:mediaId", media.delete);

export default router;
