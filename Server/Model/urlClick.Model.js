import mongoose from "mongoose";

const urlClickSchema = new  mongoose.Schema({
    urlID : {type : mongoose.Schema.Types.ObjectId , ref : 'Url' , required : true},
    timestamps : true ,
    ipAddress : {type  : String , required : true},
    referrer : {type : String} , 
    userAgent : {type : String}

} ,{timestamps :true})

const urlClick =  mongoose.model('userClick' , urlClickSchema)

export {urlClick};