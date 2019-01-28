/*
* @author 4Dcoder
*/

import express from "express";
import * as arbitration from "./controller";

const router = express.Router();

/**
 * @api {post} /arbitrations Create arbitration
 * @apiName CreateArbitration
 * @apiGroup Arbitration
 * @apiParam {String} access_token master access token.
 * @apiParam order_id Arbitration's order_id.
 * @apiParam vendor_id Arbitration's vendor_id.
 * @apiParam customer_id Arbitration's customer_id.
 * @apiParam amount Arbitration's amount.
 * @apiParam customer_complaint Arbitration's customer_complaint.
 * @apiParam vendor_complaint Arbitration's vendor_complaint.
 * @apiParam arbitration_status Arbitration's arbitration_status.
 * @apiParam arbiter Arbitration's arbiter.
 * @apiParam verdict Arbitration's verdict.
 * @apiSuccess {Object} Arbitration Arbitration's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Arbitration not found.
 * @apiError 401 master access only.
 */
router.post("/arbitrations", arbitration.create);

/**
 * @api {get} /arbitrations Retrieve arbitrations
 * @apiName RetrieveArbitrations
 * @apiGroup Arbitration
 * @apiSuccess {Object[]} rows List of Arbitrations.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/arbitrations", arbitration.findAll);


/**
 * @api {get} /arbitrations/:id Retrieve arbitration
 * @apiName RetrieveArbitration
 * @apiGroup Arbitration
 * @apiSuccess {Object} arbitration Arbitration's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Arbitration not found.
 */
router.get("/arbitrations/:arbitrationId", arbitration.findOne);

/**
 * @api {put} /arbitrations/:id Update arbitration
 * @apiName UpdateArbitration
 * @apiGroup Arbitration
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam order_id Arbitration's order_id.
 * @apiParam vendor_id Arbitration's vendor_id.
 * @apiParam customer_id Arbitration's customer_id.
 * @apiParam amount Arbitration's amount.
 * @apiParam customer_complaint Arbitration's customer_complaint.
 * @apiParam vendor_complaint Arbitration's vendor_complaint.
 * @apiParam arbitration_status Arbitration's arbitration_status.
 * @apiParam arbiter Arbitration's arbiter.
 * @apiParam verdict Arbitration's verdict.
 * @apiSuccess {Object} arbitration Arbitration's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Arbitration not found.
 * @apiError 401 master access only.
 */
router.put("/arbitrations/:arbitrationId", arbitration.update);

/**
 * @api {delete} /arbitrations/:id Delete arbitration
 * @apiName DeleteArbitration
 * @apiGroup Arbitration
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Arbitration not found.
 * @apiError 401 master access only.
 */
router.delete("/arbitrations/:arbitrationId", arbitration.delete);

export default router;
