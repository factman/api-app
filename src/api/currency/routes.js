/*
* @author 4Dcoder
*/

import express from "express";
import * as currency from "./controller";

const router = express.Router();

/**
 * @api {post} /currencies Create currency
 * @apiName CreateCurrency
 * @apiGroup Currency
 * @apiParam {String} access_token master access token.
 * @apiParam {String} name Currency's name.
 * @apiParam {String} code Currency's code.
 * @apiParam {String} description Currency's description.
 * @apiParam {Enum} kind Currency's type ["digital", "fiat"].
 * @apiParam {String} symbol Currency's symbol.
 * @apiParam {Number} exchange Currency's exchange.
 * @apiParam {Number} view_count Currency's view_count.
 * @apiSuccess {Object} Currency Currency's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Currency not found.
 * @apiError 401 master access only.
 */
router.post("/currencies", currency.create);

/**
 * @api {get} /currencies Retrieve currencies
 * @apiName RetrieveCurrencys
 * @apiGroup Currency
 * @apiSuccess {Object[]} rows List of Currencys.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/currencies", currency.findAll);


/**
 * @api {get} /currencies/:id Retrieve currency
 * @apiName RetrieveCurrency
 * @apiGroup Currency
 * @apiSuccess {Object} currency Currency's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Currency not found.
 */
router.get("/currencies/:currencyId", currency.findOne);

/**
 * @api {put} /currencies/:id Update currency
 * @apiName UpdateCurrency
 * @apiGroup Currency
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam {String} name Currency's name.
 * @apiParam {String} code Currency's code.
 * @apiParam {String} description Currency's description.
 * @apiParam {Enum} kind Currency's type ["digital", "fiat"].
 * @apiParam {String} symbol Currency's symbol.
 * @apiParam {Number} exchange Currency's exchange.
 * @apiParam {Number} view_count Currency's view_count.
 * @apiSuccess {Object} currency Currency's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Currency not found.
 * @apiError 401 master access only.
 */
router.put("/currencies/:currencyId", currency.update);

/**
 * @api {delete} /currencies/:id Delete currency
 * @apiName DeleteCurrency
 * @apiGroup Currency
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Currency not found.
 * @apiError 401 master access only.
 */
router.delete("/currencies/:currencyId", currency.delete);

export default router;
