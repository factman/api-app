/**
 * @author Odewale Ifeoluwa
 */
import express from "express";
import * as imageUpload from "./controller";

const router = express.Router();

router.post("/image/:collectionId", imageUpload.update);

export default router;
