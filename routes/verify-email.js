require('dotenv').config()
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var jwtSecret = process.env.JWT_SECRET;
var userModel = require('../models/user/user.model');


router.get('/',
    async (req, res) => {
        const token = req.header("token");
        if (!token) {
            return res.status(401).json({
                error: "401",
                mssg: "access denied - unauthorized"
            });
        }
        const jwtSecret = process.env.JWT_SECRET;
        try {
            // verify token is valid or not and return decoded header data
            const data = await jwt.verify(token, jwtSecret);
            req.email = data.email;
            
                let emailExist = await userModel.findOneAndUpdate({email : req.email},{verified:true});
                if(emailExist){
					 return res.status(200).json({
                        success: "200",
                        mssg: "Email verified successfully."
                    });
                    
                }
                else{
                   return res.status(401).json({
                        error: "404",
                        mssg: "Can't verify unregistered user."
                    });
                }  
        }
        catch (error) {
            return res.status(500).json({
                error: "500",
                mssg: "Internal server error"
            });
        }

    });
module.exports = router;