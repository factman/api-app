/*
* @author 4Dcoder
*/

import express from "express";
import * as wishlist from "./controller";

const router = express.Router();

/**
 * @api {post} /wishlists Create wishlist
 * @apiName CreateWishlist
 * @apiGroup Wishlist
 * @apiParam {String} access_token master access token.
 * @apiParam name Wishlist’s name.
 * @apiParam customer_id Wishlist’s customer id.
 * @apiParam product_array Wishlist’s product array.
 * @apiSuccess {Object} wishlist Wishlist's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Wishlist not found.
 * @apiError 401 master access only.
 */
router.post("/wishlists", wishlist.create);

/**
 * @api {get} /wishlists Retrieve wishlists
 * @apiName RetrieveWishlists
 * @apiGroup Wishlist
 * @apiSuccess {Object[]} rows List of Wishlist.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/wishlists", wishlist.findAll);

/**
 * @api {get} /wishlists/:id Retrieve wishlist
 * @apiName RetrieveWishlist
 * @apiGroup Wishlist
 * @apiSuccess {Object} wishlist Wishlist's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get("/wishlists/:wishlistId", wishlist.findOne);

/**
 * @api {put} /wishlists/:id Update wishlist
 * @apiName UpdateWishlist
 * @apiGroup Wishlist
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Wishlist’s name.
 * @apiParam customer_id Wishlist’s customer id.
 * @apiParam product_array Wishlist’s product array.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.put("/wishlists/:wishlistId", wishlist.update);

/**
 * @api {delete} /wishlists/:id Delete wishlist
 * @apiName DeleteWishlist
 * @apiGroup Wishlist
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.delete("/wishlists/:wishlistId", wishlist.delete);

export default router;
