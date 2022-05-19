const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema ({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true,
    },
    privacy : {
        type : String,
        required : true,
    },
	slug : {
        type : String,
        required : true
    },
    timestamp : {
        type : Date,
        default : Date.now,
        required : true
    }
});

const noteModel = mongoose.model('notes', noteSchema);
module.exports = noteModel;