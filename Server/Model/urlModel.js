import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    uesrID : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , requird : true} , 
    orignalUrl : {type :  String , required : true},
    shortCode : {type : String , requird :  true , unique : true},
    shortUrl : {type : String , required : true , unique : true },
    clicks : {type : Number , default : 0}
} , {timestamps : true})


const Url = new mongoose.Model('Url' , urlSchema);

export  {Url};