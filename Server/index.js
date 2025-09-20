import dotenv from "dotenv";
import mongoose from "mongoose";
import { APP_CONSTRAIN } from "./config/constant.js";
import app from "./server.js";
import connectDB from "./DB/connect.js";

dotenv.config();


  connectDB();


app.listen( APP_CONSTRAIN.PORT  || 3000 ,() => {
  console.log(`Server is running on port ${APP_CONSTRAIN.PORT}`);
});