/*
* @author 4Dcoder
*/

import express from "express";
import * as customer from "./controller";

const router = express.Router();

/**
 * @api {post} /customers Create customer
 * @apiName CreateCustomer
 * @apiGroup Customer
 * @apiParam {String} access_token master access token.
 * @apiParam publicAddress Customer's publicAddress.
 * @apiParam username Customer's username.
 * @apiParam language Customer's language.
 * @apiParam currency_id Customer's currency_id.
 * @apiParam cart Customer's cart.
 * @apiParam gender Customer's gender.
 * @apiParam password Customer's password.
 * @apiParam photo Customer's photo.
 * @apiParam profile Customer's profile.
 * @apiParam fullname Customer's fullname.
 * @apiParam address Customer's address.
 * @apiParam city Customer's city.
 * @apiParam zip Customer's zip.
 * @apiParam state Customer's state.
 * @apiParam country Customer's country.
 * @apiParam phone Customer's phone.
 * @apiParam email Customer's email.
 * @apiSuccess {Object} Customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 * @apiError 401 master access only.
 */
router.post("/customers", customer.create);

/**
 * @api {get} /customers Retrieve customers
 * @apiName RetrieveCustomers
 * @apiGroup Customer
 * @apiSuccess {Object[]} rows List of Customers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/customers", customer.findAll);


/**
 * @api {get} /customers/:id Retrieve customer
 * @apiName RetrieveCustomer
 * @apiGroup Customer
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 */
router.get("/customers/:customerId", customer.findOne);

/**
 * @api {put} /customers/:id Update customer
 * @apiName UpdateCustomer
 * @apiGroup Customer
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam publicAddress Customer's publicAddress.
 * @apiParam username Customer's username.
 * @apiParam language Customer's language.
 * @apiParam currency_id Customer's currency_id.
 * @apiParam cart Customer's cart.
 * @apiParam gender Customer's gender.
 * @apiParam password Customer's password.
 * @apiParam photo Customer's photo.
 * @apiParam profile Customer's profile.
 * @apiParam fullname Customer's fullname.
 * @apiParam address Customer's address.
 * @apiParam city Customer's city.
 * @apiParam zip Customer's zip.
 * @apiParam state Customer's state.
 * @apiParam country Customer's country.
 * @apiParam phone Customer's phone.
 * @apiParam email Customer's email.
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 * @apiError 401 master access only.
 */
router.put("/customers/:customerId", customer.update);

/**
 * @api {delete} /customers/:id Delete customer
 * @apiName DeleteCustomer
 * @apiGroup Customer
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Customer not found.
 * @apiError 401 master access only.
 */
router.delete("/customers/:customerId", customer.delete);

export default router;
