var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var jwtSecret = "secretEncryptionByAsif";
var userModel = require('../models/user');
router.post('/',
    body('usermail','wrong username or email').trim().isLength({ min: 3 }),
    body('password','password must be minimum 8 character').trim().isLength({ min: 8 }),
     async (req, res) => {

    const errors = validationResult(req);
    
    // throw validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
     //check username already exist or not
     let usernameExist = await userModel.findOne({username:req.body.usermail});
     if(usernameExist){
         // verify password
         let jwtData = {
                id : usernameExist.id   
        }
         if(bcrypt.compareSync(req.body.password, usernameExist.password)){
            let token = jwt.sign( jwtData, jwtSecret);
             res.status(200).json({
                 token : token,
                 msg: "verified with username password",
                //  id : usernameExist.id
             });
         }    
         else{
            return res.status(400).json({error:'request failed',
        mssg:"wrong password"});
        }      
     }
     else{
        //check email already exist or not
        let emailExist = await userModel.findOne({email:req.body.usermail});
        if(emailExist){
            //verify password
            let jwtData = {
                    id : emailExist.id 
            }
            if(bcrypt.compareSync(req.body.password, emailExist.password)){
                let token = jwt.sign( jwtData, jwtSecret);
                res.status(200).json({
                    token : token,
                    msg: "verified with email password",
                   //  id : emailExist.id
                });
            }
            else{
                return res.status(400).json({error:'request failed',
            mssg:"wrong password"});
            }  
        } 
        else{
            return res.status(400).json({error:'request failed',
            mssg:"wrong username or email"});
        }
     }

});
module.exports = router;