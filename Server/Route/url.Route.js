import express from 'express'
import { cheakUrl, createShortUrl } from '../Controller/url.Controller.js'


const router = express.Router();

router.post('/' , createShortUrl);

router.get("/:shortCode", cheakUrl);


// router.get("/click/:userID" , getClick)

export default router;