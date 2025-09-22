import { User } from "../Model/user.Model.js";
import ThrowError from "../Utils/apiError.js";
import jwt from 'jsonwebtoken';
import AsyncHandler from "../Utils/AsyncHandler.js"

export const cheakToken = AsyncHandler(async (req, res, next) => {
  let token;
    

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) throw new ThrowError("Token not authorized or missing!", 401);

  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decode.id);
  if (!user) throw new ThrowError("User not found", 404);

  req.user = user;
  next();
});
