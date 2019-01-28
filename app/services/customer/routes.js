/*
* @author 4Dcoder
*/

import express from "express";
import * as customer from "./controller";

const router = express.Router();

// Create a new customer
router.post("/customers", customer.create);

// Retrieve all Notes
router.get("/customers", customer.findAll);

// Retrieve a single customer with customerId
router.get("/customers/:customerId", customer.findOne);

// Update a customer with customerId
router.put("/customers/:customerId", customer.update);

// Delete a customer with customerId
router.delete("/customers/:customerId", customer.delete);

export default router;
