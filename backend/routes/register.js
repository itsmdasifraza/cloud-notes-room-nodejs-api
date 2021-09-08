var express = require('express');
var router = express.Router();

var userModel = require('../models/user');
router.post('/', function(req, res) {

    var newUser = new userModel({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    });
    newUser.save(function(err,data){
        if(err) 
            // throw error;
            res.send({mssg:"failed => try unique username and email address"})
        else{
           res.send({mssg:"success => user registered"})
        }
    });
});
module.exports = router;