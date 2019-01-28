/*
 * @author 4Dcoder
*/

import express from "express";
import * as vendor from "./controller";

const router = express.Router();

/**
 * @api {post} /vendors Create vendor
 * @apiName CreateVendor
 * @apiGroup Vendor
 * @apiParam {String} access_token master access token.
 * @apiParam business_name Vendor's business_name.
 * @apiParam currency_id Vendor's currency_id.
 * @apiParam language Vendor's language.
 * @apiParam fullname Vendor's fullname.
 * @apiParam email Vendor's email.
 * @apiParam password Vendor's password.
 * @apiParam tagline Vendor's tagline.
 * @apiParam address Vendor's address.
 * @apiParam details Vendor's details.
 * @apiParam facebook Vendor's facebook.
 * @apiParam skype Vendor's skype.
 * @apiParam google_plus Vendor's google_plus.
 * @apiParam twitter Vendor's twitter.
 * @apiParam youtube Vendor's youtube.
 * @apiParam pinterest Vendor's pinterest.
 * @apiParam phone Vendor's phone.
 * @apiParam tag Vendor's tag.
 * @apiParam description Vendor's description.
 * @apiParam country Vendor's country.
 * @apiParam city Vendor's city.
 * @apiParam zip Vendor's zip.
 * @apiParam state Vendor's state.
 * @apiParam theme Vendor's theme.
 * @apiParam logo Vendor's logo.
 * @apiParam banner Vendor's banner.
 * @apiParam homepage Vendor's homepage.
 * @apiParam product_page_style Vendor's product_page_style.
 * @apiParam product_detail_page_style Vendor's product_detail_page_style.
 * @apiParam profile_page_style Vendor's profile_page_style.
 * @apiParam blog_page_style Vendor's blog_page_style.
 * @apiParam mail_page_style Vendor's mail_page_style.
 * @apiParam invoice_page_style Vendor's invoice_page_style.
 * @apiParam ticket_page_style Vendor's ticket_page_style.
 * @apiParam view_count Vendor's view_count.
 * @apiParam last_access Vendor's last_access.
 * @apiSuccess {Object} Vendor Vendor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vendor not found.
 * @apiError 401 master access only.
 */
// router.post("/vendors", vendor.create);

/**
 * @api {get} /vendors Retrieve vendors
 * @apiName RetrieveVendors
 * @apiGroup Vendor
 * @apiSuccess {Object[]} rows List of Vendors.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/vendors", vendor.findAll);

/**
 * @api {get} /vendors/:id Retrieve vendor
 * @apiName RetrieveVendor
 * @apiGroup Vendor
 * @apiSuccess {Object} vendor Vendor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vendor not found.
 */
router.get("/vendors/:vendorId", vendor.findOne);

/**
 * @api {put} /vendors/:id Update vendor
 * @apiName UpdateVendor
 * @apiGroup Vendor
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam business_name Vendor's business_name.
 * @apiParam currency_id Vendor's currency_id.
 * @apiParam language Vendor's language.
 * @apiParam fullname Vendor's fullname.
 * @apiParam email Vendor's email.
 * @apiParam password Vendor's password.
 * @apiParam tagline Vendor's tagline.
 * @apiParam address Vendor's address.
 * @apiParam details Vendor's details.
 * @apiParam facebook Vendor's facebook.
 * @apiParam skype Vendor's skype.
 * @apiParam google_plus Vendor's google_plus.
 * @apiParam twitter Vendor's twitter.
 * @apiParam youtube Vendor's youtube.
 * @apiParam pinterest Vendor's pinterest.
 * @apiParam phone Vendor's phone.
 * @apiParam tag Vendor's tag.
 * @apiParam description Vendor's description.
 * @apiParam country Vendor's country.
 * @apiParam city Vendor's city.
 * @apiParam zip Vendor's zip.
 * @apiParam state Vendor's state.
 * @apiParam theme Vendor's theme.
 * @apiParam logo Vendor's logo.
 * @apiParam banner Vendor's banner.
 * @apiParam homepage Vendor's homepage.
 * @apiParam product_page_style Vendor's product_page_style.
 * @apiParam product_detail_page_style Vendor's product_detail_page_style.
 * @apiParam profile_page_style Vendor's profile_page_style.
 * @apiParam blog_page_style Vendor's blog_page_style.
 * @apiParam mail_page_style Vendor's mail_page_style.
 * @apiParam invoice_page_style Vendor's invoice_page_style.
 * @apiParam ticket_page_style Vendor's ticket_page_style.
 * @apiParam view_count Vendor's view_count.
 * @apiParam last_access Vendor's last_access.
 * @apiSuccess {Object} product Vendor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vendor not found.
 * @apiError 401 master access only.
 */
router.put("/vendors/:vendorId", vendor.update);

/**
 * @api {delete} /vendors/:id Delete vendor
 * @apiName DeleteVendor
 * @apiGroup Vendor
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Vendor not found.
 * @apiError 401 master access only.
 */
router.delete("/vendors/:vendorId", vendor.delete);

export default router;
