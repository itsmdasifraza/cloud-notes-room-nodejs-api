const mongoose = require('mongoose');
// const mongoUrl = "mongodb://10.12.1.9:27017/chats-notes";
const mongoUrl = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@social-chat-notes.dsgia.mongodb.net/social-chat-notes`;
// const connectMongo = () =>{
    mongoose.connect(mongoUrl , ()=>{
        console.log("mongodb connection established");
    });
// }