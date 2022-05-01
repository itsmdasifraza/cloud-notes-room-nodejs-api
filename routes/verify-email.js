require('dotenv').config()
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var jwtSecret = process.env.JWT_SECRET;
var userModel = require('../models/user');


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
            try{
                let emailExist = await userModel.findOneAndUpdate({email : req.email},{verified:true});
                if(!emailExist){
                    return res.status(401).json({
                        error: "404",
                        mssg: "Can't verify unregistered user."
                    });
                }
                if(emailExist){
                    return res.status(200).json({
                        error: "200",
                        mssg: "Email verified successfully."
                    });
                }
            }catch{
                return res.status(401).json({
                    error: "401",
                    mssg: "Internal server error."
                });
            }
        }
        catch (error) {
            return res.status(401).json({
                error: "401",
                mssg: "Access denied - Unauthorized."
            });
        }

    });
module.exports = router;