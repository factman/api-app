/*
* @author 4Dcoder
*/

import express from "express";
import * as coupon from "./controller";

const router = express.Router();

// Create a new coupon
router.post("/coupons", coupon.create);

// Retrieve all Notes
router.get("/coupons", coupon.findAll);

// Retrieve a single coupon with couponId
router.get("/coupons/:couponId", coupon.findOne);

// Update a coupon with couponId
router.put("/coupons/:couponId", coupon.update);

// Delete a coupon with couponId
router.delete("/coupons/:couponId", coupon.delete);

export default router;
