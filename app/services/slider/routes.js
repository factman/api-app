/*
* @author 4Dcoder
*/

import express from "express";
import * as slider from "./controller";

const sliderRoute = express.Router();

// Create a new slider
sliderRoute.post("/sliders", slider.create);

// Retrieve all Notes
sliderRoute.get("/sliders", slider.findAll);

// Retrieve a single slider with sliderId
sliderRoute.get("/sliders/:sliderId", slider.findOne);

// Update a slider with sliderId
sliderRoute.put("/sliders/:sliderId", slider.update);

// Delete a slider with sliderId
sliderRoute.delete("/sliders/:sliderId", slider.delete);

export default sliderRoute;
