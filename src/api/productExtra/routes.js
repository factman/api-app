/*
* @author 4Dcoder
*/

import express from "express";
import * as productExtra from "./controller";

const router = express.Router();

/**
 * @api {post} /product-extras Create productExtra
 * @apiName CreateProductExtra
 * @apiGroup ProductExtra
 * @apiParam {String} access_token master access token.
 * @apiParam product_id ProductExtra’s product id.
 * @apiParam vendor_id ProductExtra’s vendor id.
 * @apiParam name ProductExtra’s name.
 * @apiParam value ProductExtra’s value.
 * @apiSuccess {Object} productExtra ProductExtra's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 ProductExtra not found.
 * @apiError 401 master access only.
 */
router.post("/product-extras", productExtra.create);

/**
 * @api {get} /product-extras Retrieve productExtras
 * @apiName RetrieveProductExtras
 * @apiGroup ProductExtra
 * @apiSuccess {Object[]} rows List of Product Extras.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/product-extras", productExtra.findAll);

/**
 * @api {get} /product-extras/:id Retrieve product-extras
 * @apiName RetrieveProductExtra
 * @apiGroup ProductExtra
 * @apiSuccess {Object} product Product-extra's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get("/product-extras/:productExtraId", productExtra.findOne);

/**
 * @api {put} /product-extras/:id Update product-extra
 * @apiName UpdateProductExtra
 * @apiGroup ProductExtra
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam product_id ProductExtra’s product id.
 * @apiParam vendor_id ProductExtra’s vendor id.
 * @apiParam name ProductExtra’s name.
 * @apiParam value ProductExtra’s value.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.put("/product-extras/:productExtraId", productExtra.update);

/**
 * @api {delete} /product-extras/:id Delete product-extra
 * @apiName DeleteProductExtra
 * @apiGroup ProductExtra
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.delete("/product-extras/:productExtraId", productExtra.delete);

export default router;
