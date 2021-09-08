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
    date : {
        type : Date,
        default : Date.now
    },
    
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;