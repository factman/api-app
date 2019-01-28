/*
* @author 4Dcoder
*/

import express from "express";
import * as order from "./controller";

const router = express.Router();

/**
 * @api {post} /orders Create order
 * @apiName CreateOrder
 * @apiGroup Order
 * @apiParam {String} access_token master access token.
 * @apiParam order_num Order's order_num.
 * @apiParam kind Order's kind.
 * @apiParam customer_id Order's customer_id.
 * @apiParam vendor_id Order's vendor_id.
 * @apiParam product_array Order's product_array.
 * @apiParam payment_array Order's payment_array.
 * @apiParam shipment_array Order's shipment_array.
 * @apiParam delivery_array Order's delivery_array.
 * @apiParam tracking_num Order's tracking_num.
 * @apiParam vat Order's vat.
 * @apiParam payable Order's payable.
 * @apiParam coupon_id Order's coupon_id.
 * @apiParam order_status Order's order_status.
 * @apiParam fullname Order's fullname.
 * @apiParam zip Order's zip.
 * @apiParam address Order's address.
 * @apiParam street Order's street.
 * @apiParam city Order's city.
 * @apiParam state Order's state.
 * @apiParam country Order's country.
 * @apiParam phone Order's phone.
 * @apiParam email Order's email.
 * @apiSuccess {Object} Order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 * @apiError 401 master access only.
 */
router.post("/orders", order.create);

/**
 * @api {get} /orders Retrieve orders
 * @apiName RetrieveOrders
 * @apiGroup Order
 * @apiSuccess {Object[]} rows List of Orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/orders", order.findAll);


/**
 * @api {get} /orders/:id Retrieve order
 * @apiName RetrieveOrder
 * @apiGroup Order
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.get("/orders/:orderId", order.findOne);

/**
 * @api {put} /orders/:id Update order
 * @apiName UpdateOrder
 * @apiGroup Order
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam order_num Order's order_num.
 * @apiParam kind Order's kind.
 * @apiParam customer_id Order's customer_id.
 * @apiParam vendor_id Order's vendor_id.
 * @apiParam product_array Order's product_array.
 * @apiParam payment_array Order's payment_array.
 * @apiParam shipment_array Order's shipment_array.
 * @apiParam delivery_array Order's delivery_array.
 * @apiParam tracking_num Order's tracking_num.
 * @apiParam vat Order's vat.
 * @apiParam payable Order's payable.
 * @apiParam coupon_id Order's coupon_id.
 * @apiParam order_status Order's order_status.
 * @apiParam fullname Order's fullname.
 * @apiParam zip Order's zip.
 * @apiParam address Order's address.
 * @apiParam street Order's street.
 * @apiParam city Order's city.
 * @apiParam state Order's state.
 * @apiParam country Order's country.
 * @apiParam phone Order's phone.
 * @apiParam email Order's email.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 * @apiError 401 master access only.
 */
router.put("/orders/:orderId", order.update);

/**
 * @api {delete} /orders/:id Delete order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Order not found.
 * @apiError 401 master access only.
 */
router.delete("/orders/:orderId", order.delete);

export default router;
