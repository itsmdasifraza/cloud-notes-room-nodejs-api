require('dotenv').config()
var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');
var jwtSecret = process.env.JWT_SECRET;

var userModel = require('../models/user');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD
    }
});

router.post('/',
    body('username', 'username must between 4 to 36 character').trim().isLength({ min: 4, max: 36 }),
    body('email', 'email must be valid').isEmail(),
    body('password', 'password must be minimum 8 character').trim().isLength({ min: 8 }),
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
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        try {
            //check username already exist or not
            let usernameExist = await userModel.findOne({ username: req.body.username});
            // console.log(usernameExist);
            if (usernameExist && usernameExist.verified == true) {
                return res.status(400).json({
                    error: 'request failed',
                    mssg: "username already in use"
                });
            }
            if (usernameExist && usernameExist.verified == false) {
                let reUsernameExist = await userModel.findOneAndDelete({ username: req.body.username , verified: false });
                if(!reUsernameExist){
                    return res.status(404).json({
                        error: '404',
                        mssg: "internal server error",
                    });
                }

            }
        } catch {
            return res.status(404).json({
                error: '404',
                mssg: "internal server error",
            });
        }
        try {
            //check email already exist or not
            let emailExist = await userModel.findOne({ email: req.body.email });
            if (emailExist && emailExist.verified == true) {
                return res.status(400).json({
                    error: 'request failed',
                    mssg: "email already in use"
                });
            }
            if (emailExist && emailExist.verified == false) {
                let reEmailExist = await userModel.findOneAndDelete({ email: req.body.email , verified : false });
                if(!reEmailExist){
                    return res.status(404).json({
                        error: '404',
                        mssg: "internal server error",
                    });
                }
            }
        } catch {
            return res.status(404).json({
                error: '404',
                mssg: "internal server error",
            });
        }
        //pushing user object to mongo
        newUser.save(function (err, data) {
            if (err)
                return res.status(400).json({
                    error: 'request failed',
                    mssg: "something went wrong"
                });
            else {
                let jwtData = {
                    email : req.body.email   
            }
                let token = jwt.sign( jwtData, jwtSecret);
                // send mail with defined transport object
                let info = transporter.sendMail({
                   from: `${process.env.APP_NAME} <${process.env.SENDER_EMAIL}>`, // sender address
                    to: req.body.email, // list of receivers
                    subject: `Email confirmation for your account`, // Subject line
                    html:`<p>Hello <b>${req.body.username}!</b></p>
					<p>A request has been raised for registration on ${process.env.APP_NAME} and you were under process. To confirm your email just follow the link below:</p>
					<p><a href="${process.env.FRONTEND_CONNECTION}://${process.env.FRONTEND_IP}/verify/email/${token}">${process.env.FRONTEND_CONNECTION}://${process.env.FRONTEND_IP}/verify/email/${token}</a></p>
                    <p>After that, go to <a href="${process.env.FRONTEND_CONNECTION}://${process.env.FRONTEND_IP}/login">${process.env.FRONTEND_CONNECTION}://${process.env.FRONTEND_IP}/login</a>, where you can login into the system. Thank you for your interest in ${process.env.APP_NAME}.</p>
					<p>If you didn't initiate this request, just ignore this letter.</p>
                    <p>With best regards,<br/>${process.env.APP_NAME} Developer.</p>`, // html body
                }, (err, res) => {
                    if (err) {
                        // console.log(err);
                    }
                    else {
                        // console.log(res);
                    }
                });
                return res.status(200).json({
                    success: 'request success',
                    mssg: `Verification link sent on your email ${data.email}, please click the link to finish registration.`,
                    info: { username: data.username, email: data.email }
                });
            }
        });

    });
module.exports = router;