var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const authToken = require('../middlewares/auth-token');

var userModel = require('../models/user/user.model');


router.get('/read',
    authToken,
     async (req, res) => {

     // find user with their userid
     try{
		 let user = await userModel.findOne({ _id : req.userid }).select("-password");
		 if( !user ){
			return res.status(404).json({error:'404',
			mssg:"user not found"});
		}
		else{
			 return res.status(200).json({success:'200',
			 mssg:"user retrieved",
			info : user});
		 }
     }
	 
     catch{
        return res.status(500).json({
			error:'500',
        mssg:"Internal server error"});
     }
     
});
module.exports = router;