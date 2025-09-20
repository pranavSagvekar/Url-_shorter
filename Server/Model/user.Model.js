import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    googleID : {type : String , required : null} , 
    name : {type : String , required : true} , 
    email : {type : String , required : true , unique : true} ,
    passwordHash : {type : String  , required : true },
    } 
    ,
    {timestamps : true});
const User = new model('User' , userSchema);

export {User}