import AsyncHandler from '../Utils/AsyncHandler.js';
import { ApiResponce } from '../Utils/ApiResponce.js';
import ThrowError from '../Utils/apiError.js';
import Url from '../Model/urlModel.js';
import mongoose from 'mongoose';

export const createShortUrl = AsyncHandler(async (req, res) => {
    
    const { originalUrl } = req.body;  
    if (!originalUrl) throw new ThrowError("originalUrl is required", 400);

    const shortCode = Math.random().toString(36).substring(2, 8); 
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    const newUrl = await Url.create({
        userId : req.user._id ,
        originalUrl,
        shortCode,
        shortUrl
    });

    res.status(201).json(
        new ApiResponce(201, newUrl, "Short URL created successfully")
    );
});
