require('dotenv').config()
const mongoose = require('mongoose');
// const mongoUrl = "mongodb://10.12.1.9:27017/chats-notes";
const mongoUrl = process.env.MONGO_DATABASE;

// const connectMongo = () =>{
    mongoose.connect(mongoUrl , (err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("mongodb connection established");
        }
    });
// }