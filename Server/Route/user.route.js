import express from "express";
import { register , login } from "../Controller/user.Controller.js";

const router = express.Router();

router.post("/", register);
router.post("/",login)

export default router;


