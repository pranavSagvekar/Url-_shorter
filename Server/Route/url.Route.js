import express from 'express';
import { cheakUrl, createShortUrl, getData } from '../Controller/url.Controller.js';
import { cheakToken } from '../Middleware/auth.Middleware.js';

const router = express.Router();



// Public creation
router.post("/",  cheakToken ,createShortUrl);
router.get("/clicks/:shortCode", getData);

export default router;
