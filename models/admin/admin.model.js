const mongoose = require('mongoose');

const adminSchema = {
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
        default : "user0",
        required : true
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
        default : Date.now,
        required : true
    },
    verified : {
        type : Boolean,
        default : false,
        required : true
    },
    
}

const adminModel = mongoose.model('admins', adminSchema);
module.exports = adminModel;