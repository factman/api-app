/*
* @author 4Dcoder
* @data 16-July-2018
*/

import express from "express";
import * as product from "./controller";

const router = express.Router();

/**
 * @api {post} /products Create product
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiParam {String} code Product’s (unique) code.
 * @apiParam {String} sku Product’s sku (unique) Stock-Keeping Unit.
 * @apiParam {String} upc Product’s upc (unique) Universal Product Code.
 * @apiParam {String} name Product’s (required) name.
 * @apiParam {String} tag Product’s tag.
 * @apiParam {String} vendor_id Product’s (required) vendor id.
 * @apiParam {String} category_id Product’s (required) category id.
 * @apiParam {String} brand_id Product’s brand id.
 * @apiParam {String} description Product’s (required) description.
 * @apiParam {String} short_description Product’s (required) short description.
 * @apiParam {Number} unit_cost Product’s (required) unit cost.
 * @apiParam {Number} unit_price Product’s (required) unit price.
 * @apiParam {Number} alt_price Product’s alt price.
 * @apiParam {Number} shipping_cost Product’s shipping cost.
 * @apiParam {String} unit Product’s unit (dozen, carton, set, pack).
 * @apiParam {String} length Product’s length (metre, inches).
 * @apiParam {String} width Product’s width (metre, inches).
 * @apiParam {String} height Product’s height (metre, inches).
 * @apiParam {String} color Product’s color (green, magenta).
 * @apiParam {String} options Product’s options (siblings).
 * @apiParam {Number} discount Product’s (default:0) discount.
 * @apiParam {Enum} discount_type Product’s discount type ["fixed", "percent"] default: "percent".
 * @apiParam {Number} tax Product’s (default:0) tax.
 * @apiParam {Enum} tax_type Product’s tax type ["fixed", "percent"] default: "percent".
 * @apiParam {Boolean} download Product’s download.
 * @apiParam {String} download_name Product’s download name.
 * @apiParam {Boolean} deal Product’s deal.
 * @apiParam {Enum} valuation Product’s valuation ["FIFO", "LIFO", "AVCO"].
 * @apiParam {Number} download_num Product’s (default:0) download num.
 * @apiParam {Boolean} featured Product’s featured.
 * @apiParam {Date} view_date Product’s view date.
 * @apiParam {Number} view_count Product’s view count.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.post("/products", product.create);

/**
 * @api {get} /products Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Product
 * @apiSuccess {Object[]} rows List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/products", product.findAll);

/**
 * @api {get} /products/:id Retrieve product
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get("/products/:productId", product.findOne);

/**
 * @api {put} /products/:id Update product
 * @apiName UpdateProduct
 * @apiGroup Product
 * @apiParam {String} code Product’s (unique) code.
 * @apiParam {String} sku Product’s sku (unique) Stock-Keeping Unit.
 * @apiParam {String} upc Product’s upc (unique) Universal Product Code.
 * @apiParam {String} name Product’s (required) name.
 * @apiParam {String} tag Product’s tag.
 * @apiParam {String} vendor_id Product’s (required) vendor id.
 * @apiParam {String} category_id Product’s (required) category id.
 * @apiParam {String} brand_id Product’s brand id.
 * @apiParam {String} description Product’s (required) description.
 * @apiParam {String} short_description Product’s (required) short description.
 * @apiParam {Number} unit_cost Product’s (required) unit cost.
 * @apiParam {Number} unit_price Product’s (required) unit price.
 * @apiParam {Number} alt_price Product’s alt price.
 * @apiParam {Number} shipping_cost Product’s shipping cost.
 * @apiParam {String} unit Product’s unit (dozen, carton, set, pack).
 * @apiParam {String} length Product’s length (metre, inches).
 * @apiParam {String} width Product’s width (metre, inches).
 * @apiParam {String} height Product’s height (metre, inches).
 * @apiParam {String} color Product’s color (green, magenta).
 * @apiParam {String} options Product’s options (siblings).
 * @apiParam {Number} discount Product’s (default:0) discount.
 * @apiParam {Enum} discount_type Product’s discount type ["fixed", "percent"] default: "percent".
 * @apiParam {Number} tax Product’s (default:0) tax.
 * @apiParam {Enum} tax_type Product’s tax type ["fixed", "percent"] default: "percent".
 * @apiParam {Boolean} download Product’s download.
 * @apiParam {String} download_name Product’s download name.
 * @apiParam {Boolean} deal Product’s deal.
 * @apiParam {Enum} valuation Product’s valuation ["FIFO", "LIFO", "AVCO"].
 * @apiParam {Number} download_num Product’s (default:0) download num.
 * @apiParam {Boolean} featured Product’s featured.
 * @apiParam {Date} view_date Product’s view date.
 * @apiParam {Number} view_count Product’s view count.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.put("/products/:productId", product.update);

/**
 * @api {delete} /products/:id Delete product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.delete("/products/:productId", product.delete);

export default router;
