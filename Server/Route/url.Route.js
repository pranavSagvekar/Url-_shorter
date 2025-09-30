import express from 'express';
import {  createShortUrl,  totalClicks , getAllUrlsDataOneByOne } from '../Controller/url.Controller.js';
import { cheakToken } from '../Middleware/auth.Middleware.js';

const router = express.Router();



// Public creation
router.post("/",  cheakToken ,createShortUrl);
router.get("/totalClick" , cheakToken , totalClicks)
router.get("/initialData" , cheakToken , getAllUrlsDataOneByOne)

export default router;
