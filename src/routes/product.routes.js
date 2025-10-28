import { GetProducts,GetProductsBySlug } from "../controllers/product.controller";
import handleAsyncErr from "../utils/handleAsyncErr";
import express from "express";

const router =  express.Router()

router.get('/',handleAsyncErr(GetProducts))

router.get('/:slug',handleAsyncErr(GetProductsBySlug))
