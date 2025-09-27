import express from "express";
import { register , login, verifyUser } from "../Controller/user.Controller.js";
import { cheakToken } from "../Middleware/auth.Middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", cheakToken, verifyUser);
router.post


export default router;


