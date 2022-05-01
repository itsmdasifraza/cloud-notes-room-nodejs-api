require('dotenv').config()
const mongoose = require('mongoose');
// const mongoUrl = "mongodb://10.12.1.9:27017/chats-notes";
const mongoUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@my-cluster-shard-00-00.vbhhe.mongodb.net:27017,my-cluster-shard-00-01.vbhhe.mongodb.net:27017,my-cluster-shard-00-02.vbhhe.mongodb.net:27017/${process.env.MONGO_DATABASE}?ssl=true&replicaSet=atlas-jtxeom-shard-0&authSource=admin&retryWrites=true&w=majority`;

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