/*
* @author 4Dcoder
*/

import express from "express";
import * as admin from "./controller";

const router = express.Router();

/**
 * @api {get} /admins Retrieve admins
 * @apiName RetrieveAdmins
 * @apiGroup Admin
 * @apiSuccess {Object[]} rows List of Admins.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/admins", admin.findAll);


/**
 * @api {get} /admins/:id Retrieve admin
 * @apiName RetrieveAdmin
 * @apiGroup Admin
 * @apiSuccess {Object} admin Admin's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Admin not found.
 */
router.get("/admins/:adminId", admin.findOne);

/**
 * @api {put} /admins/:id Update admin
 * @apiName UpdateAdmin
 * @apiGroup Admin
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam username Admin’s username.
 * @apiParam fullname Admin’s fullname.
 * @apiParam phone Admin’s phone.
 * @apiParam email Admin’s email.
 * @apiSuccess {Object} admin Admin's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Admin not found.
 * @apiError 401 master access only.
 */
router.put("/admins/:adminId", admin.update);

/**
 * @api {delete} /admins/:id Delete admin
 * @apiName DeleteAdmin
 * @apiGroup Admin
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Admin not found.
 * @apiError 401 master access only.
 */
router.delete("/admins/:adminId", admin.delete);

export default router;
