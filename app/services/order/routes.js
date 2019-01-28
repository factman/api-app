/*
* @author 4Dcoder
*/

import express from "express";
import * as order from "./controller";

const router = express.Router();

// Create a new order
router.post("/orders", order.create);

// Retrieve all Notes
router.get("/orders", order.findAll);

// Retrieve a single order with orderId
router.get("/orders/:orderId", order.findOne);

// Update a order with orderId
router.put("/orders/:orderId", order.update);

// Delete a order with orderId
router.delete("/orders/:orderId", order.delete);

export default router;
