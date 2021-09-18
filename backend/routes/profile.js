var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const authToken = require('../middlewares/auth-token');

var userModel = require('../models/user');



////////////////////////////////////////////////
//           Route for read username          //
////////////////////////////////////////////////
router.get('/read/:username',
    authToken,
     async (req, res) => {

     // find all the chat with their userid
     try{
     var userData = await userModel.findOne({username : req.params.username , _id : req.userid });
    //  console.log(chatData)
        if( !userData){
            try{
                var userData = await userModel.findOne({username : req.params.username  });
                if(!userData){
                    return res.status(404).json({error:'404',
                    mssg:"username not found"});
                }
            }
            catch{

                return res.status(404).json({error:'404',
                    mssg:"username not found"});
            }
            return res.status(200).json({success:'200',
            mssg:"not owner of this username",
           data : userData});
        }
     }
     catch{
        try{
            var userData = await userModel.findOne({username : req.params.username  });
            if(!userData){
                return res.status(404).json({error:'404',
                mssg:"username not found"});
            }
        }
        catch{
            return res.status(404).json({error:'404',
            mssg:"username not found"});
        }
        return res.status(200).json({success:'200',
        mssg:"not owner of this username",
       data : userData});
     }
     return res.status(200).json({success:'200',
     mssg:"owner of this username",
    data : userData});
});

module.exports = router;