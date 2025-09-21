import express from 'express'
import { createShortUrl } from '../Controller/url.Controller.js'

const router = express.Router();

router.post('/' , createShortUrl);

export default router;