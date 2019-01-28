/*
* @author 4Dcoder
*/

import express from "express";
import * as stock from "./controller";

const router = express.Router();

/**
 * @api {post} /stocks Create stock
 * @apiName CreateStock
 * @apiGroup Stock
 * @apiParam {String} access_token master access token.
 * @apiParam business_name Vendor's business_name.
 * @apiParam vendor_id Stock's vendor_id.
 * @apiParam product_id Stock's product_id.
 * @apiParam order_num Stock's order_num.
 * @apiParam kind Stock's kind.
 * @apiParam quantity Stock's quantity.
 * @apiParam avaialable Stock's avaialable.
 * @apiParam unit_cost Stock's unit_cost.
 * @apiParam unit_price Stock's unit_price.
 * @apiParam description Stock's description.
 * @apiSuccess {Object} Stock Stock's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Stock not found.
 * @apiError 401 master access only.
 */
router.post("/stocks", stock.create);

/**
 * @api {get} /stocks Retrieve stocks
 * @apiName RetrieveStocks
 * @apiGroup Stock
 * @apiSuccess {Object[]} rows List of Stock.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/stocks", stock.findAll);

/**
 * @api {get} /stocks/:id Retrieve stock
 * @apiName RetrieveStock
 * @apiGroup Stock
 * @apiSuccess {Object} stock Stock's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get("/stocks/:stockId", stock.findOne);

/**
 * @api {put} /stocks/:id Update stock
 * @apiName UpdateStock
 * @apiGroup Stock
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam business_name Vendor's business_name.
 * @apiParam vendor_id Stock's vendor_id.
 * @apiParam product_id Stock's product_id.
 * @apiParam order_num Stock's order_num.
 * @apiParam kind Stock's kind.
 * @apiParam quantity Stock's quantity.
 * @apiParam avaialable Stock's avaialable.
 * @apiParam unit_cost Stock's unit_cost.
 * @apiParam unit_price Stock's unit_price.
 * @apiParam description Stock's description.
 * @apiSuccess {Object} stock Stock's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Stock not found.
 * @apiError 401 master access only.
 */
router.put("/stocks/:stockId", stock.update);

/**
 * @api {delete} /stocks/:id Delete stock
 * @apiName DeleteStock
 * @apiGroup Stock
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Stock not found.
 * @apiError 401 master access only.
 */
router.delete("/stocks/:stockId", stock.delete);

export default router;
