/*
* @author 4Dcoder
*/

import express from "express";
import * as mail from "./controller";

const router = express.Router();

/**
 * @api {post} /mails Create mail
 * @apiName CreateMail
 * @apiGroup Mail
 * @apiParam {String} access_token master access token.
 * @apiParam name Mail’s name.
 * @apiParam mail_title Mail’s mail_title
 * @apiParam mail_subject Mail’s mail_subject.
 * @apiParam mail_body Mail’s mail_body.
 * @apiSuccess {Object} Mail Mail's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Mail not found.
 * @apiError 401 master access only.
 */
router.post("/mails", mail.create);

/**
 * @api {get} /mails Retrieve mails
 * @apiName RetrieveMails
 * @apiGroup Mail
 * @apiSuccess {Object[]} rows List of Mails.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/mails", mail.findAll);


/**
 * @api {get} /mails/:id Retrieve mail
 * @apiName RetrieveMail
 * @apiGroup Mail
 * @apiSuccess {Object} mail Mail's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Mail not found.
 */
router.get("/mails/:mailId", mail.findOne);

/**
 * @api {put} /mails/:id Update mail
 * @apiName UpdateMail
 * @apiGroup Mail
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Mail’s name.
 * @apiParam mail_title Mail’s mail_title
 * @apiParam mail_subject Mail’s mail_subject.
 * @apiParam mail_body Mail’s mail_body.
 * @apiSuccess {Object} mail Mail's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Mail not found.
 * @apiError 401 master access only.
 */
router.put("/mails/:mailId", mail.update);

/**
 * @api {delete} /mails/:id Delete mail
 * @apiName DeleteMail
 * @apiGroup Mail
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Mail not found.
 * @apiError 401 master access only.
 */
router.delete("/mails/:mailId", mail.delete);

export default router;
