import AsyncHandler from '../Utils/AsyncHandler.js';
import { ApiResponce } from '../Utils/ApiResponce.js';
import ThrowError from '../Utils/apiError.js';
import Url from '../Model/urlModel.js';
import { urlClick } from '../Model/urlClick.Model.js';

export const createShortUrl = AsyncHandler(async (req, res) => {
    
    const { originalUrl } = req.body;  
    if (!originalUrl) throw new ThrowError("originalUrl is required", 400);

    const shortCode = Math.random().toString(36).substring(2, 8); 
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    const newUrl = await Url.create({
        userId : req.user._id ,
        originalUrl,
        shortCode,
        shortUrl,
        clicks : 0
    });

    res.status(201).json(
        new ApiResponce(201, newUrl, "Short URL created successfully")
    );
});


export const cheakUrl = AsyncHandler(async (req , res) => {
    const {shortCode} = req.params;
    const url = await Url.findOne({shortCode});
    if(!url) throw  new ThrowError(404 , "User not found");

    await urlClick.create({
    urlID: url._id,
    ipAddress: req.ip,
    referrer: req.get("referer") || null,     
    userAgent: req.get("user-agent") || null  
    });

    url.clicks  = url.clicks + 1;
    await url.save();


    res.redirect(url.originalUrl)
})


export const getData = AsyncHandler(async (req , res) => {
    const {shortCode} = req.params;

    const url = await Url.findOne({shortCode});
    if(!url) throw  new ThrowError(404 , "User not found");

    const clicks = await urlClick.find({urlID : url._id}).sort({createdAt : -1});

     res.status(200).json({
    success: true,
    shortUrl: url.shortUrl,
    originalUrl: url.originalUrl,
    totalClicks: url.clicks,
    clicks: clicks.map(c => ({
      ipAddress: c.ipAddress,
      referrer: c.referrer,
      userAgent: c.userAgent,
      createdAt: c.createdAt
    }))
});
})

