/*
* @author 4Dcoder
*/

import express from "express";
import * as role from "./controller";

const router = express.Router();

/**
 * @api {post} /roles Create role
 * @apiName CreateRole
 * @apiGroup Role
 * @apiParam {String} access_token master access token.
 * @apiParam name Role’s name.
 * @apiParam permission Role’s permission.
 * @apiParam description Role’s description.
 * @apiSuccess {Object} Role Role's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Role not found.
 * @apiError 401 master access only.
 */
router.post("/roles", role.create);

/**
 * @api {get} /roles Retrieve roles
 * @apiName RetrieveRoles
 * @apiGroup Role
 * @apiSuccess {Object[]} rows List of Roles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/roles", role.findAll);

/**
 * @api {get} /roles/:id Retrieve role
 * @apiName RetrieveRole
 * @apiGroup Role
 * @apiSuccess {Object} role Role's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Role not found.
 */
router.get("/roles/:roleId", role.findOne);

/**
 * @api {put} /roles/:id Update role
 * @apiName UpdateRole
 * @apiGroup Role
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Role’s name.
 * @apiParam permission Role’s permission.
 * @apiParam description Role’s description.
 * @apiSuccess {Object} role Role's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Role not found.
 * @apiError 401 master access only.
 */
router.put("/roles/:roleId", role.update);

/**
 * @api {delete} /roles/:id Delete role
 * @apiName DeleteRole
 * @apiGroup Role
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Role not found.
 * @apiError 401 master access only.
 */
router.delete("/roles/:roleId", role.delete);

export default router;
