/**
 * @author 4Dcoder
 * @co author Odewale Ifeoluwa
 */
import express from "express";

import create from "./controller";

const router = express.Router();

/** POST /api/auth */
router.route("/").post(create);

export default router;
