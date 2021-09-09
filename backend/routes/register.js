var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');

var userModel = require('../models/user');
router.post('/',
    body('username','username must be minimum 3 character').trim().isLength({ min: 3 }),
    body('email','email must be valid').isEmail(),
    body('password','password must be minimum 8 character').trim().isLength({ min: 8 }),
     async (req, res) => {

    const errors = validationResult(req);
    
    // throw validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // enctypting password 
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    // creating user object
    var newUser = new userModel({
        username:req.body.username,
        email:req.body.email,
        password:hash
    });

     //check username already exist or not
     let usernameExist = await userModel.findOne({username:req.body.username});
     if(usernameExist){
         return res.status(400).json({error:'request failed',
             mssg:"username already in use"});
     }

    //check email already exist or not
    let emailExist = await userModel.findOne({email:req.body.email});
    if(emailExist){
        return res.status(400).json({error:'request failed',
            mssg:"email already in use"});
    } 

    //pushing user object to mongo
    newUser.save(function(err,data){
        if(err) 
            return res.status(400).json({error:'request failed',
                mssg:"something went wrong"});
        else{
           return res.status(200).json({success:'request success',
                        mssg:"congratulations user registered",
                    info : {username :data.username , email: data.email}});
        }
    });

});
module.exports = router;