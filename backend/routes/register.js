var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

var userModel = require('../models/user');
router.post('/',
    body('username','username must be minimum 3 character').isLength({ min: 3 }),
    body('email','email must be valid').isEmail(),
    body('password','password must be minimum 8 character').isLength({ min: 8 }),
     function(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // creating user object
    var newUser = new userModel({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    });
    //pushing user object to mongo
    newUser.save(function(err,data){
        if(err) 
            return res.status(400).json({error:'request failed',
                mssg:"username/email already in use"});
        else{
           return res.status(200).json({success:'request success',
                        mssg:"congratulations user registered",
                    data : data});
        }
    });

});
module.exports = router;