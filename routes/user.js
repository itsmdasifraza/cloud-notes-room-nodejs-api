var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const authToken = require('../middlewares/auth-token');

var userModel = require('../models/user/user.model');


router.get('/read',
    authToken,
     async (req, res) => {

     // find all the chat with their userid
     try{
     var userData = await userModel.findOne({ _id : req.userid });
    //  console.log(chatData)
     if( !userData ){
        return res.status(404).json({error:'404',
        mssg:"user not found"});
     }
     }
     catch{
        return res.status(404).json({error:'404',
        mssg:"user not found"});
     }
     return res.status(200).json({success:'200',
     mssg:"user retrieved",
    info : userData});
});
module.exports = router;