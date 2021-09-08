const mongoose = require('mongoose');
const mongoUrl = "mongodb://localhost:27017/chat-notes";

// const connectMongo = () =>{
    mongoose.connect(mongoUrl , ()=>{
        console.log("mongodb connection established");
    });
// }