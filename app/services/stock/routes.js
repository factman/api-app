/*
* @author 4Dcoder
*/

import express from "express";
import * as stock from "./controller";

const router = express.Router();

// Create a new stock
router.post("/stocks", stock.create);

// Retrieve all Notes
router.get("/stocks", stock.findAll);

// Retrieve a single stock with stockId
router.get("/stocks/:stockId", stock.findOne);

// Update a stock with stockId
router.put("/stocks/:stockId", stock.update);

// Delete a stock with stockId
router.delete("/stocks/:stockId", stock.delete);

export default router;
