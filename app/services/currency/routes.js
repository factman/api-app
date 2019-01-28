/*
* @author 4Dcoder
*/

import express from "express";
import * as currency from "./controller";

const router = express.Router();

// Create a new currency
router.post("/currencies", currency.create);

// Retrieve all Notes
router.get("/currencies", currency.findAll);

// Retrieve a single currency with currencyId
router.get("/currencies/:currencyId", currency.findOne);

// Update a currency with currencyId
router.put("/currencies/:currencyId", currency.update);

// Delete a currency with currencyId
router.delete("/currencies/:currencyId", currency.delete);

export default router;
