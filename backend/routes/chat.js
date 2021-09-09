var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const authToken = require('../middlewares/auth-token');

var chatModel = require('../models/chat');

router.post('/create',
    body('title','title must be minimum 2 character').trim().isLength({ min: 2 }),
    body('description','description must be minimum 4 character').trim().isLength({ min: 4 }),authToken,
     async (req, res) => {

    const errors = validationResult(req);
    
    // throw validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

   
    // creating user object
    var newChat = new chatModel({
        userid : req.userid,
        title:req.body.title,
        description:req.body.description
    });


    //pushing user object to mongo
    newChat.save(function(err,data){
        if(err) 
            return res.status(500).json({error:'500',
                mssg:"internal server error"});
        else{
           return res.status(200).json({success:'200',
                        mssg:"congratulations chat created",
                    info : {title :data.title , description: data.description}});
        }
    });

});

module.exports = router;