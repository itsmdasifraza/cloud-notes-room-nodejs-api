var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const authToken = require('../middlewares/auth-token');

var chatModel = require('../models/chat');
var noteModel = require('../models/note');

router.post('/create/:id',
    body('message','message must be minimum 1 character').trim().isLength({ min: 1 }),
    authToken,
     async (req, res) => {

    const errors = validationResult(req);
    
    // throw validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.userid);
     // check chat with logged in userid already exist or not
     try{
     let chatExist = await chatModel.findOne({_id:req.params.id , userid : req.userid});
    //  console.log(chatExist)
     if(!chatExist){
        return res.status(404).json({error:'404',
        mssg:"chat not found"});
     }
     }
     catch{
        return res.status(404).json({error:'404',
        mssg:"chat not found"});
     }
     
    // creating note object
    var newNote = new noteModel({
        userid : req.userid,
        chatid : req.params.id,
        message:req.body.message
    });


    //pushing note object to mongo
    newNote.save(function(err,data){
        if(err) 
            return res.status(500).json({error:'500',
                mssg:"internal server error"});
        else{
           return res.status(200).json({success:'200',
                        mssg:"congratulations note created",
                    info : {message :data.message }});
        }
    });

});

module.exports = router;