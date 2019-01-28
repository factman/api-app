/*
* @author 4Dcoder
*/

import express from "express";
import * as review from "./controller";

const router = express.Router();

/**
 * @api {post} /reviews Create review
 * @apiName CreateReview
 * @apiGroup Review
 * @apiParam {String} access_token master access token.
 * @apiParam subject Review’s subject either of "product",
 *  "category", "brand", "vendor", "stock", "order".
 * @apiParam subject_id Review’s subject id.
 * @apiParam comment Review’s comment.
 * @apiParam rating Review’s rating.
 * @apiSuccess {Object} Review Review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Review not found.
 * @apiError 401 master access only.
 */
router.post("/reviews", review.create);

/**
 * @api {get} /reviews Retrieve reviews
 * @apiName RetrieveReviews
 * @apiGroup Review
 * @apiSuccess {Object[]} rows List of Reviews.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/reviews", review.findAll);

/**
 * @api {get} /reviews/:id Retrieve review
 * @apiName RetrieveReview
 * @apiGroup Review
 * @apiSuccess {Object} review Review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Review not found.
 */
router.get("/reviews/:reviewId", review.findOne);

/**
 * @api {put} /reviews/:id Update review
 * @apiName UpdateReview
 * @apiGroup Review
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam subject Review’s subject either of "product",
 *  "category", "brand", "vendor", "stock", "order".
 * @apiParam subject_id Review’s subject id.
 * @apiParam comment Review’s comment.
 * @apiParam rating Review’s rating.
 * @apiSuccess {Object} review Review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Review not found.
 * @apiError 401 master access only.
 */
router.put("/reviews/:reviewId", review.update);

/**
 * @api {delete} /reviews/:id Delete review
 * @apiName DeleteReview
 * @apiGroup Review
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Review not found.
 * @apiError 401 master access only.
 */
router.delete("/reviews/:reviewId", review.delete);

export default router;
