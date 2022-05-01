const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema ({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    privacy : {
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
    lastupdated : {
        type : Date,
        default : Date.now,
        required : true
    },
    lastnote : {
        type : String,
        default : "No notes to show !",
        required : true,
    },
});

const chatModel = mongoose.model('chat', chatSchema);
module.exports = chatModel;