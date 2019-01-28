/*
* @author 4Dcoder
*/

import express from "express";
import * as template from "./controller";

const router = express.Router();

/**
 * @api {post} /templates Create template
 * @apiName CreateTemplate
 * @apiGroup Template
 * @apiParam {String} access_token master access token.
 * @apiParam name Template’s name.
 * @apiParam page Template’s page id.
 * @apiParam icon Template’s icon.
 * @apiParam style Template’s style.
 * @apiSuccess {Object} Template Template's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Template not found.
 * @apiError 401 master access only.
 */
router.post("/templates", template.create);

/**
 * @api {get} /templates Retrieve templates
 * @apiName RetrieveTemplates
 * @apiGroup Template
 * @apiSuccess {Object[]} rows List of Templates.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/templates", template.findAll);

/**
 * @api {get} /templates/:id Retrieve template
 * @apiName RetrieveTemplate
 * @apiGroup Template
 * @apiSuccess {Object} template Template's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get("/templates/:templateId", template.findOne);

/**
 * @api {put} /templates/:id Update template
 * @apiName UpdateTemplate
 * @apiGroup Template
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Template’s name.
 * @apiParam page Template’s page id.
 * @apiParam icon Template’s icon.
 * @apiParam style Template’s style.
 * @apiSuccess {Object} template Template's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.put("/templates/:templateId", template.update);

/**
 * @api {delete} /templates/:id Delete template
 * @apiName DeleteTemplate
 * @apiGroup Template
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.delete("/templates/:templateId", template.delete);

export default router;
