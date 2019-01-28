/*
* @author 4Dcoder
*/

import express from "express";
import * as media from "./controller";

const router = express.Router();

/**
 * @api {post} /media Create media
 * @apiName CreateMedia
 * @apiGroup Media
 * @apiParam {String} access_token master access token.
 * @apiParam title Media's title.
 * @apiParam description Media's description.
 * @apiParam media_type Media's media_type.
 * @apiParam vendor_id Media's vendor_id.
 * @apiParam purpose Media's purpose.
 * @apiParam subject Media's subject.
 * @apiParam page Media's page.
 * @apiParam place Media's place.
 * @apiParam num Media's sort num or position.
 * @apiParam status Media's status.
 * @apiParam url Media's url.
 * @apiParam style Media's style.
 * @apiParam {String} image_sm Product’s small image.
 * @apiParam {String} image_md Product’s medium image.
 * @apiParam {String} image_lg Product’s large image.
 * @apiParam {String} image_front Product’s front view image.
 * @apiParam {String} image_back Product’s back view image.
 * @apiParam {String} image_top Product’s top view image.
 * @apiParam {String} image_bottom Product’s bottom view image.
 * @apiParam {String} image_rightProduct’s right view image.
 * @apiParam {String} image_left Product’s left view image.
 * @apiParam {String} icon Product’s (required) icon url.
 * @apiSuccess {Object} Media Media's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Media not found.
 * @apiError 401 master access only.
 */
router.post("/media", media.create);

/**
 * @api {get} /media Retrieve media
 * @apiName RetrieveMedias
 * @apiGroup Media
 * @apiSuccess {Object[]} rows List of Medias.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/media", media.findAll);


/**
 * @api {get} /media/:id Retrieve media
 * @apiName RetrieveMedia
 * @apiGroup Media
 * @apiSuccess {Object} media Media's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Media not found.
 */
router.get("/media/:mediaId", media.findOne);

/**
 * @api {put} /media/:id Update media
 * @apiName UpdateMedia
 * @apiGroup Media
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam title Media's title.
 * @apiParam description Media's description.
 * @apiParam media_type Media's media_type.
 * @apiParam vendor_id Media's vendor_id.
 * @apiParam purpose Media's purpose.
 * @apiParam subject Media's subject.
 * @apiParam page Media's page.
 * @apiParam place Media's place.
 * @apiParam num Media's sort num or position.
 * @apiParam status Media's status.
 * @apiParam url Media's url.
 * @apiParam style Media's style.
 * @apiSuccess {Object} media Media's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Media not found.
 * @apiError 401 master access only.
 */
router.put("/media/:mediaId", media.update);

/**
 * @api {delete} /media/:id Delete media
 * @apiName DeleteMedia
 * @apiGroup Media
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Media not found.
 * @apiError 401 master access only.
 */
router.delete("/media/:mediaId", media.delete);

export default router;
