/*
* @author 4Dcoder
*/

import express from "express";
import * as setting from "./controller";

const router = express.Router();

/**
 * @api {post} /settings Create setting
 * @apiName CreateSetting
 * @apiGroup Setting
 * @apiParam {String} access_token master access token.
 * @apiParam code Setting's code.
 * @apiParam kind Setting's kind.
 * @apiParam name Setting's name.
 * @apiParam value Setting's value.
 * @apiParam description Setting's description.
 * @apiSuccess {Object} Setting Setting's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Setting not found.
 * @apiError 401 master access only.
 */
router.post("/settings", setting.create);

/**
 * @api {get} /settings Retrieve settings
 * @apiName RetrieveSettings
 * @apiGroup Setting
 * @apiSuccess {Object[]} rows List of Settings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/settings", setting.findAll);

/**
 * @api {get} /settings/:id Retrieve setting
 * @apiName RetrieveSetting
 * @apiGroup Setting
 * @apiSuccess {Object} setting Setting's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Setting not found.
 */
router.get("/settings/:settingId", setting.findOne);

/**
 * @api {put} /settings/:id Update setting
 * @apiName UpdateSetting
 * @apiGroup Setting
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam code Setting's code.
 * @apiParam kind Setting's kind.
 * @apiParam name Setting's name.
 * @apiParam value Setting's value.
 * @apiParam description Setting's description.
 * @apiSuccess {Object} setting Setting's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Setting not found.
 * @apiError 401 master access only.
 */
router.put("/settings/:settingId", setting.update);

/**
 * @api {delete} /settings/:id Delete setting
 * @apiName DeleteSetting
 * @apiGroup Setting
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Setting not found.
 * @apiError 401 master access only.
 */
router.delete("/settings/:settingId", setting.delete);

export default router;
