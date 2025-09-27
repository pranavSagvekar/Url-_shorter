import { User } from "../Model/user.Model.js";
import AsyncHandler from "../Utils/AsyncHandler.js";
import { ApiResponce } from "../Utils/ApiResponce.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ThrowError from "../Utils/apiError.js";

// Generate token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.EXPIRED_IN
        }
    );
};

// Register controller
export const register = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) throw new ThrowError("Email already exists", 400);

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, passwordHash });

    const token = generateToken(user);

    


    res.status(201).json(
        new ApiResponce(true, "User registered successfully", { user, token })
    );
});

// Login controller
export const login = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new ThrowError("Invalid email or password", 401);

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new ThrowError("Invalid email or password", 401);

    const token = generateToken(user);

    res.status(200).json(
        new ApiResponce(true, "Signin successful", { user, token })
    );
});


export const logout = AsyncHandler(async (req, res) => {
    res.status(200).json( new ApiResponce(true , 'Logout successful' , null) );
})


export const verifyUser = (req, res) => {

  res.status(200).json({
    success: true,
    message: "User is logged in",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
   
  });
};
