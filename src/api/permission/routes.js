/*
* @author 4Dcoder
*/

import express from "express";
import * as permission from "./controller";

const router = express.Router();

/**
 * @api {post} /permissions Create permission
 * @apiName CreatePermission
 * @apiGroup Permission
 * @apiParam {String} access_token master access token.
 * @apiParam name Permission’s name.
 * @apiParam codename Permission’s codename.
 * @apiParam parent_status Permission’s parent_status.
 * @apiParam description Permission’s description.
 * @apiSuccess {Object} Permission Permission's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Permission not found.
 * @apiError 401 master access only.
 */
router.post("/permissions", permission.create);

/**
 * @api {get} /permissions Retrieve permissions
 * @apiName RetrievePermissions
 * @apiGroup Permission
 * @apiSuccess {Object[]} rows List of Permissions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/permissions", permission.findAll);


/**
 * @api {get} /permissions/:id Retrieve permission
 * @apiName RetrievePermission
 * @apiGroup Permission
 * @apiSuccess {Object} permission Permission's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Permission not found.
 */
router.get("/permissions/:permissionId", permission.findOne);

/**
 * @api {put} /permissions/:id Update permission
 * @apiName UpdatePermission
 * @apiGroup Permission
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Permission’s name.
 * @apiParam codename Permission’s codename.
 * @apiParam parent_status Permission’s parent_status.
 * @apiParam description Permission’s description.
 * @apiSuccess {Object} permission Permission's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Permission not found.
 * @apiError 401 master access only.
 */
router.put("/permissions/:permissionId", permission.update);

/**
 * @api {delete} /permissions/:id Delete permission
 * @apiName DeletePermission
 * @apiGroup Permission
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Permission not found.
 * @apiError 401 master access only.
 */
router.delete("/permissions/:permissionId", permission.delete);

export default router;
