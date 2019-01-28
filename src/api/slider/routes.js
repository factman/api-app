/*
* @author 4Dcoder
*/

import express from "express";
import * as slider from "./controller";

const sliderRoute = express.Router();

/**
 * @api {post} /sliders Create slider
 * @apiName CreateSlider
 * @apiGroup Slider
 * @apiParam {String} access_token master access token.
 * @apiParam name Slider's name.
 * @apiParam vendor_id Slider's vendor_id.
 * @apiParam kind Slider's kind.
 * @apiParam elements Slider's elements.
 * @apiParam place Slider's place.
 * @apiParam title Slider's title.
 * @apiParam style Slider's style.
 * @apiSuccess {Object} Slider Slider's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Slider not found.
 * @apiError 401 master access only.
 */
sliderRoute.post("/sliders", slider.create);

/**
 * @api {get} /sliders Retrieve sliders
 * @apiName RetrieveSliders
 * @apiGroup Slider
 * @apiSuccess {Object[]} rows List of Sliders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
sliderRoute.get("/sliders", slider.findAll);

/**
 * @api {get} /sliders/:id Retrieve slider
 * @apiName RetrieveSlider
 * @apiGroup Slider
 * @apiSuccess {Object} slider Slider's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Slider not found.
 */
sliderRoute.get("/sliders/:sliderId", slider.findOne);

/**
 * @api {put} /sliders/:id Update slider
 * @apiName UpdateSlider
 * @apiGroup Slider
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Slider's name.
 * @apiParam vendor_id Slider's vendor_id.
 * @apiParam kind Slider's kind.
 * @apiParam elements Slider's elements.
 * @apiParam place Slider's place.
 * @apiParam title Slider's title.
 * @apiParam style Slider's style.
 * @apiSuccess {Object} slider Slider's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Slider not found.
 * @apiError 401 master access only.
 */
sliderRoute.put("/sliders/:sliderId", slider.update);

/**
 * @api {delete} /sliders/:id Delete slider
 * @apiName DeleteSlider
 * @apiGroup Slider
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Slider not found.
 * @apiError 401 master access only.
 */
sliderRoute.delete("/sliders/:sliderId", slider.delete);

export default sliderRoute;
