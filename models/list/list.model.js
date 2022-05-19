const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema ({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    noteid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "note",
        required : true,
    },
    message : {
        type : String,
        required : true,
    },
    timestamp : {
        type : Date,
        default : Date.now,
        required : true
    },
});

const listModel = mongoose.model('lists', listSchema);
module.exports = listModel;