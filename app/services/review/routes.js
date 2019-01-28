/*
* @author 4Dcoder
*/

import express from "express";
import * as review from "./controller";

const router = express.Router();

// Create a new review
router.post("/reviews", review.create);

// Retrieve all Notes
router.get("/reviews", review.findAll);

// Retrieve a single review with reviewId
router.get("/reviews/:reviewId", review.findOne);

// Update a review with reviewId
router.put("/reviews/:reviewId", review.update);

// Delete a review with reviewId
router.delete("/reviews/:reviewId", review.delete);

export default router;
