/*
* @author 4Dcoder
*/

import express from "express";
import * as subscriber from "./controller";

const router = express.Router();

/**
 * @api {post} /subscribers Create subscriber
 * @apiName CreateSubscriber
 * @apiGroup Subscriber
 * @apiParam {String} access_token master access token.
 * @apiParam email Subscriber’s email.
 * @apiParam frequency Subscriber’s frequency.
 * @apiParam interest Subscriber’s interest.
 * @apiSuccess {Object} Subscriber Subscriber's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Subscriber not found.
 * @apiError 401 master access only.
 */
router.post("/subscribers", subscriber.create);

/**
 * @api {get} /subscribers Retrieve subscribers
 * @apiName RetrieveSubscribers
 * @apiGroup Subscriber
 * @apiSuccess {Object[]} rows List of Subscribers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/subscribers", subscriber.findAll);

/**
 * @api {get} /subscribers/:id Retrieve subscriber
 * @apiName RetrieveSubscriber
 * @apiGroup Subscriber
 * @apiSuccess {Object} subscriber Subscriber’s data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get("/subscribers/:subscriberId", subscriber.findOne);

/**
 * @api {put} /subscribers/:id Update subscriber
 * @apiName UpdateSubscriber
 * @apiGroup Subscriber
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam email Subscriber’s email.
 * @apiParam frequency Subscriber’s frequency.
 * @apiParam interest Subscriber’s interest.
 * @apiSuccess {Object} subscriber Subscriber's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.put("/subscribers/:subscriberId", subscriber.update);

/**
 * @api {delete} /subscribers/:id Delete subscriber
 * @apiName DeleteSubscriber
 * @apiGroup Subscriber
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Subscriber not found.
 * @apiError 401 master access only.
 */
router.delete("/subscribers/:subscriberId", subscriber.delete);

export default router;
