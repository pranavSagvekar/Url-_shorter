import express from 'express'

import { cheakUrl } from '../Controller/url.Controller.js'

const router = express.Router();
router.get("/:shortCode", cheakUrl);

export default router;