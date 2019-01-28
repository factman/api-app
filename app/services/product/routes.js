/*
* @author 4Dcoder
*/

import express from "express";
import * as product from "./controller";

const router = express.Router();

// Create a new product
router.post("/products", product.create);

// Retrieve all Notes
router.get("/products", product.findAll);

// Retrieve a single product with productId
router.get("/products/:productId", product.findOne);

// Update a product with productId
router.put("/products/:productId", product.update);

// Delete a product with productId
router.delete("/products/:productId", product.delete);

export default router;
