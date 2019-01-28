/*
* @author 4Dcoder
*/

import express from "express";
import * as blog from "./controller";

const router = express.Router();

/**
 * @api {post} /blogs Create blog
 * @apiName CreateBlog
 * @apiGroup Blog
 * @apiParam {String} access_token master access token.
 * @apiParam kind Blog's kind.
 * @apiParam title Blog's title.
 * @apiParam summary Blog's summary.
 * @apiParam author Blog's author.
 * @apiParam content Blog's content.
 * @apiParam tag Blog's tag.
 * @apiParam image Blog's image.
 * @apiSuccess {Object} blog Blog's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Blog not found.
 * @apiError 401 master access only.
 */
router.post("/blogs", blog.create);

/**
* @api {get} /blogs Retrieve blogs
* @apiName RetrieveBlogs
* @apiGroup Blog
* @apiSuccess {Object[]} rows List of Blogs.
* @apiError {Object} 400 Some parameters may contain invalid values.
*/
router.get("/blogs", blog.findAll);


/**
 * @api {get} /blogs/:id Retrieve blog
 * @apiName RetrieveBlog
 * @apiGroup Blog
 * @apiSuccess {Object} blog Blog's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Blog not found.
 */
router.get("/blogs/:blogId", blog.findOne);

/**
 * @api {put} /blogs/:id Update blog
 * @apiName UpdateBlog
 * @apiGroup Blog
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam kind Blog's kind.
 * @apiParam title Blog's title.
 * @apiParam summary Blog's summary.
 * @apiParam author Blog's author.
 * @apiParam content Blog's content.
 * @apiParam tag Blog's tag.
 * @apiParam image Blog's image.
 * @apiSuccess {Object} blog Blog's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Blog not found.
 * @apiError 401 master access only.
 */
router.put("/blogs/:blogId", blog.update);

/**
 * @api {delete} /blogs/:id Delete blog
 * @apiName DeleteBlog
 * @apiGroup Blog
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Blog not found.
 * @apiError 401 master access only.
 */
router.delete("/blogs/:blogId", blog.delete);

export default router;
