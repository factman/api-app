/*
* @author 4Dcoder
*/

import express from "express";
import * as category from "./controller";

const router = express.Router();

/**
 * @api {post} /categories Create category
 * @apiName CreateCategory
 * @apiGroup Category
 * @apiParam {String} access_token master access token.
 * @apiParam name Category’s name.
 * @apiParam description Category’s description.
 * @apiParam icon Category’s icon.
 * @apiParam banner Category’s banner.
 * @apiSuccess {Object} Category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 */
router.post("/categories", category.create);

/**
 * @api {get} /categories Retrieve categories
 * @apiName RetrieveCategorys
 * @apiGroup Category
 * @apiSuccess {Object[]} rows List of Categorys.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/categories", category.findAll);


/**
 * @api {get} /categories/:id Retrieve category
 * @apiName RetrieveCategory
 * @apiGroup Category
 * @apiSuccess {Object} category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 */
router.get("/categories/:categoryId", category.findOne);

/**
 * @api {put} /categories/:id Update category
 * @apiName UpdateCategory
 * @apiGroup Category
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Category’s name.
 * @apiParam description Category’s description.
 * @apiParam icon Category’s icon.
 * @apiParam banner Category’s banner.
 * @apiSuccess {Object} category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 */
router.put("/categories/:categoryId", category.update);

/**
 * @api {delete} /categories/:id Delete category
 * @apiName DeleteCategory
 * @apiGroup Category
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 */
router.delete("/categories/:categoryId", category.delete);

export default router;
