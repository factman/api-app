/*
* @author 4Dcoder
*/

import express from "express";
import * as languageList from "./controller";

const router = express.Router();

/**
 * @api {post} /language-lists Create language-list
 * @apiName CreatelanguageList
 * @apiGroup languageList
 * @apiParam {String} access_token master access token.
 * @apiParam name language-list's name.
 * @apiParam db_field language-list's db_field.
 * @apiParam icon language-list's icon.
 * @apiSuccess {Object} languageList languageList's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 languageList not found.
 * @apiError 401 master access only.
 */
router.post("/language-lists", languageList.create);

/**
 * @api {get} /language-lists Retrieve language-lists
 * @apiName RetrievelanguageLists
 * @apiGroup languageList
 * @apiSuccess {Object[]} rows List of languageLists.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/language-lists", languageList.findAll);


/**
 * @api {get} /language-lists/:id Retrieve language-list
 * @apiName RetrievelanguageList
 * @apiGroup languageList
 * @apiSuccess {Object} language-list languageList's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 languageList not found.
 */
router.get("/language-lists/:languageListId", languageList.findOne);

/**
 * @api {put} /language-lists/:id Update language-list
 * @apiName UpdatelanguageList
 * @apiGroup languageList
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name language-list's name.
 * @apiParam db_field language-list's db_field.
 * @apiParam icon language-list's icon.
 * @apiSuccess {Object} language-list languageList's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 languageList not found.
 * @apiError 401 master access only.
 */
router.put("/language-lists/:languageListId", languageList.update);

/**
 * @api {delete} /language-lists/:id Delete language-list
 * @apiName DeletelanguageList
 * @apiGroup languageList
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 languageList not found.
 * @apiError 401 master access only.
 */
router.delete("/language-lists/:languageListId", languageList.delete);

export default router;
