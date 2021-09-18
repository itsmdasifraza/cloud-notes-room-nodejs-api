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


////////////////////////////////////////////////
//           Route for read username          //
////////////////////////////////////////////////
router.post('/update/avatar/:username',
    authToken,
     async (req, res) => {

     // find all the chat with their userid
     try{
         console.log(req.body);
         let avatar = {
             avatar : req.body.avatar
         }
     var userData = await userModel.findOneAndUpdate({username : req.params.username , _id : req.userid },avatar);
    //  console.log(userData)
     if(!userData){
        return res.status(404).json({error:'404',
        mssg:"internal server error",
       });
     }       
     }
     catch{
        return res.status(404).json({error:'404',
        mssg:"internal server error",
       });
     }
     return res.status(200).json({success:'200',
     mssg:"user avatar changed",
    });
});


////////////////////////////////////////////////
//           Route for read username          //
////////////////////////////////////////////////
router.post('/update/personal/:username',
    authToken,
     async (req, res) => {

     // find all the chat with their userid
     try{
         console.log(req.body);
         let personal = {
             name : req.body.name,
             phone : req.body.phone,
             address : req.body.address,
             college : req.body.college,
             education : req.body.education,
             about : req.body.about
         }
     var personalData = await userModel.findOneAndUpdate({username : req.params.username , _id : req.userid },personal);
    //  console.log(userData)
     if(!personalData){
        return res.status(404).json({error:'404',
        mssg:"internal server error",
       });
     }       
     }
     catch{
        return res.status(404).json({error:'404',
        mssg:"internal server error",
       });
     }
     return res.status(200).json({success:'200',
     mssg:"user personal detail changed",
    });
});

module.exports = router;