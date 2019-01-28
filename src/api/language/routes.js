/*
* @author 4Dcoder
*/

import express from "express";
import * as language from "./controller";

const router = express.Router();

/**
 * @api {post} /languages Create language
 * @apiName CreateLanguage
 * @apiGroup Language
 * @apiParam {String} access_token master access token.
 * @apiParam word Language’s word.
 * @apiParam english Language’s english.
 * @apiParam french Language’s french.
 * @apiParam spanish Language’s spanish.
 * @apiParam bangla Language’s bangla.
 * @apiParam arabic Language’s arabic.
 * @apiParam chinese Language’s chinese.
 * @apiSuccess {Object} Language Language's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Language not found.
 * @apiError 401 master access only.
 */
router.post("/languages", language.create);

/**
 * @api {get} /languages Retrieve languages
 * @apiName RetrieveLanguages
 * @apiGroup Language
 * @apiSuccess {Object[]} rows List of Languages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/languages", language.findAll);


/**
 * @api {get} /languages/:id Retrieve language
 * @apiName RetrieveLanguage
 * @apiGroup Language
 * @apiSuccess {Object} language Language's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Language not found.
 */
router.get("/languages/:languageId", language.findOne);

/**
 * @api {put} /languages/:id Update language
 * @apiName UpdateLanguage
 * @apiGroup Language
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam word Language’s word.
 * @apiParam english Language’s english.
 * @apiParam french Language’s french.
 * @apiParam spanish Language’s spanish.
 * @apiParam bangla Language’s bangla.
 * @apiParam arabic Language’s arabic.
 * @apiParam chinese Language’s chinese.
 * @apiSuccess {Object} language Language's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Language not found.
 * @apiError 401 master access only.
 */
router.put("/languages/:languageId", language.update);

/**
 * @api {delete} /languages/:id Delete language
 * @apiName DeleteLanguage
 * @apiGroup Language
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Language not found.
 * @apiError 401 master access only.
 */
router.delete("/languages/:languageId", language.delete);

export default router;
