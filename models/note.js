const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema ({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    chatid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "chat",
        required : true,
    },
    message : {
        type : String,
        required : true,
    },
    stamp : {
        type : Object,
        required : true
    },
    date : {
        type : Date,
        default : Date.now,
        required : true
    },
});

const noteModel = mongoose.model('note', noteSchema);
module.exports = noteModel;