import dotenv from "dotenv";
import mongoose from "mongoose";
import { APP_CONSTRAIN } from "./config/constant.js";
import app from "./server.js";
import connectDB from "./DB/connect.js";
import urlRouter from './Route/url.Route.js';
import registerRouter from './Route/user.route.js';
import { login } from "./Controller/user.Controller.js";
import { cheakToken } from "./Middleware/auth.Middleware.js";

dotenv.config({
  path : './.env'
});
connectDB();
app.use('/api/register' ,registerRouter )
app.use('/api/login' ,   login)
app.use('/api/url' , cheakToken,urlRouter);

app.listen( APP_CONSTRAIN.PORT  || 3000 ,() => {
  console.log(`Server is running on port ${APP_CONSTRAIN.PORT}`);
});