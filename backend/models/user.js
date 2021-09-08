const mongoose = require('mongoose');

const user = {
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
    date : {
        type : Date,
        default : Date.now
    },
    
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

// sample data to be stored in database
const kitty = new userModel({ 
    username: 'Zildjian',
    email : "asifgmail.com", 
    password : "765456777"
});

//save data to the database demo (example)
kitty.save().then(() => console.log('meow'));