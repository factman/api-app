/*
* @author 4Dcoder
*/

import express from "express";
import * as message from "./controller";

const router = express.Router();

/**
 * @api {post} /messages Create message
 * @apiName CreateMessage
 * @apiGroup Message
 * @apiParam {String} access_token master access token.
 * @apiParam kind Message's kind.
 * @apiParam message_session Message's message_session.
 * @apiParam message_between Message's message_between.
 * @apiParam visitor_name Message's visitor_name.
 * @apiParam visitor_email Message's visitor_email.
 * @apiParam subject Message's subject.
 * @apiParam message Message's message.
 * @apiParam customer_id Message's customer_id.
 * @apiParam vendor_id Message's vendor_id.
 * @apiParam admin_id Message's admin_id.
 * @apiParam sent_by Message's sent_by.
 * @apiSuccess {Object} Message Message's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 * @apiError 401 master access only.
 */
router.post("/messages", message.create);

/**
 * @api {get} /messages Retrieve messages
 * @apiName RetrieveMessages
 * @apiGroup Message
 * @apiSuccess {Object[]} rows List of Messages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/messages", message.findAll);


/**
 * @api {get} /messages/:id Retrieve message
 * @apiName RetrieveMessage
 * @apiGroup Message
 * @apiSuccess {Object} message Message's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 */
router.get("/messages/:messageId", message.findOne);

/**
 * @api {put} /messages/:id Update message
 * @apiName UpdateMessage
 * @apiGroup Message
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam kind Message's kind.
 * @apiParam message_session Message's message_session.
 * @apiParam message_between Message's message_between.
 * @apiParam visitor_name Message's visitor_name.
 * @apiParam visitor_email Message's visitor_email.
 * @apiParam subject Message's subject.
 * @apiParam message Message's message.
 * @apiParam customer_id Message's customer_id.
 * @apiParam vendor_id Message's vendor_id.
 * @apiParam admin_id Message's admin_id.
 * @apiParam sent_by Message's sent_by.
 * @apiSuccess {Object} message Message's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 * @apiError 401 master access only.
 */
router.put("/messages/:messageId", message.update);

/**
 * @api {delete} /messages/:id Delete message
 * @apiName DeleteMessage
 * @apiGroup Message
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Message not found.
 * @apiError 401 master access only.
 */
router.delete("/messages/:messageId", message.delete);

export default router;
