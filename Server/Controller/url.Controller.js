import AsyncHandler from '../Utils/AsyncHandler.js';
import { ApiResponce } from '../Utils/ApiResponce.js';
import ThrowError from '../Utils/apiError.js';
import Url from '../Model/urlModel.js';
import { urlClick } from '../Model/urlClick.Model.js';
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


export const totalClicks = AsyncHandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user._id);

  const result = await Url.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: "$userId",
        totalClicks: { $sum: "$clicks" },
        totalUrls: { $sum: 1 }
      }
    }
  ]);

  if (result.length === 0) {
    throw new ThrowError(404, "Data not found");
  }

  res.status(200).json(
    new ApiResponce(
      200,
      {
        totalClicks: result[0].totalClicks,
        totalUrls: result[0].totalUrls
      },
      "Data fetched successfully"
    )
  );
});


export const getAllUrlsDataOneByOne = AsyncHandler(async (req , res) => {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const urls = await Url.find({userId}).sort({createdAt : -1});

    if(urls.length === 0){
        throw new ThrowError("No URLs found" , 404);
    }

    const formateDate = (date) => {
      
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2 , '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${month}/${day}/${year}`;
    }

    const data = urls.map( url => ({
        originalUrl : url.originalUrl ,
        shortUrl : url.shortUrl ,
        clicks : url.clicks,
        createdAt : formateDate(url.createdAt) ,
        shortcode : url.shortCode,
        
    }))

    res.status(200).json(new ApiResponce(true , "Data added successfully" , data));
   
    
})