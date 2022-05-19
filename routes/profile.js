var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const authToken = require('../middlewares/auth-token');
var bcrypt = require('bcryptjs');
var userModel = require('../models/user/user.model');



////////////////////////////////////////////////
//           Route for read username          //
////////////////////////////////////////////////
router.get('/read/:username',
    
     async (req, res) => {

     // find all the chat with their userid
     try{
     var userData = await userModel.findOne({username : req.params.username });
    //  console.log(userData)
        if( !userData){
                return res.status(404).json({error:'404',
                    mssg:"username not found"});
        }
     }
     catch{
            return res.status(404).json({error:'404',
            mssg:"username not found"});
        }
       
     return res.status(200).json({success:'200',
     mssg:"fetched username",
    data : userData});
});


////////////////////////////////////////////////
//           Route for read username          //
////////////////////////////////////////////////
router.get('/read/info/owner',
    authToken,
     async (req, res) => {

     // find all the chat with their userid
     try{
     var ownerUserData = await userModel.findOne({_id : req.userid });
    //  console.log(ownerUserData)
        if( !ownerUserData){
                    return res.status(404).json({error:'404',
                    mssg:"username not 56 found"});
        }
     }
     catch{
        return res.status(404).json({error:'404',
        mssg:"username not 57 found"});
     }
     return res.status(200).json({success:'200',
     mssg:"owner of this username",
    data : ownerUserData});
});


////////////////////////////////////////////////
//           Route for read username          //
////////////////////////////////////////////////
router.post('/update/info/avatar',
body('avatar').isLength({ min: 1 }),
    authToken,
     async (req, res) => {

     // find all the chat with their userid
     try{
        //  console.log(req.body);
         let avatar = {
             avatar : req.body.avatar
         }
     var userData = await userModel.findOneAndUpdate({_id : req.userid },avatar);
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
     userData.avatar = req.body.avatar;
     return res.status(200).json({success:'200',
     mssg:"user avatar changed",
     data : userData
    });
});

////////////////////////////////////////////////
//           update user password             //
////////////////////////////////////////////////
router.post('/update/info/password',
    authToken,
    
    body('newpassword','password must be minimum 8 character').trim().isLength({ min: 8 }),
    body('confirmpassword','password must be minimum 8 character').trim().isLength({ min: 8 }),
     
     async (req, res) => {
        if(req.body.newpassword != req.body.confirmpassword){
            return res.status(404).json({error:'404',
            mssg:"password didn't match",
           });
        }
     // enctypting password 
     var salt = bcrypt.genSaltSync(10);
     var hash = bcrypt.hashSync(req.body.newpassword, salt);

     // find all the chat with their userid
     try{
        //  console.log(req.body);
         let password = {
             password : hash
         }
     var userPasswordData = await userModel.findOneAndUpdate({_id : req.userid },password);
    //  console.log(userData)
     if(!userPasswordData){
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
     mssg:"user password changed",
    });
});

////////////////////////////////////////////////
//           Route for read username          //
////////////////////////////////////////////////
router.post('/update/info/personal',
    authToken,
     async (req, res) => {

     // find all the chat with their userid
     try{
        //  console.log(req.body);
         let personal = {
             name : req.body.name,
             phone : req.body.phone,
             address : req.body.address,
             college : req.body.college,
             education : req.body.education,
             about : req.body.about
         }
     var personalData = await userModel.findOneAndUpdate({_id : req.userid },personal);
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
     personalData.name = req.body.name;
     personalData.phone = req.body.phone;
     personalData.address = req.body.address;
     personalData.college = req.body.college;
     personalData.education = req.body.education;
     personalData.about = req.body.about;

     return res.status(200).json({success:'200',
     mssg:"user personal detail changed",
     data: personalData
    });
});

module.exports = router;