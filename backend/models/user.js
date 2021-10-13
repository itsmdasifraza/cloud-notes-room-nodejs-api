const mongoose = require('mongoose');

const userSchema = {
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        default : ""
    },
    avatar : {
        type : String,
        default : "user0"
    },
    phone : {
        type : String,
        default : ""
    },
    address : {
        type : String,
        default : ""
    },
    college : {
        type : String,
        default : ""
    },
    education : {
        type : String,
        default : ""
    },
    about : {
        type : String,
        default : ""
    },
    date : {
        type : Date,
        default : Date.now
    },
    verified : {
        type : Boolean,
        default : false
    },
    
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;