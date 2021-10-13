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
            let usernameExist = await userModel.findOne({ username: req.body.username });
            if (usernameExist) {
                return res.status(400).json({
                    error: 'request failed',
                    mssg: "username already in use"
                });
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
            if (emailExist) {
                return res.status(400).json({
                    error: 'request failed',
                    mssg: "email already in use"
                });
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
                    from: 'itsmdasifraza@gmail.com', // sender address
                    to: "asif20856@gmail.com", // list of receivers
                    subject: "SocialChatNotes - Email confirmation", // Subject line
                    text: `Hello ${req.body.username}`, // plain text body
                    html: `<p>Hello ${req.body.username}.</p><p>Your email was provided for registration on socialChatNotes and you were successfully registered.</p>
                    <p>To confirm your email please follow the link <a href="http://192.168.43.99:4200/verify/email/${token}">http://192.168.43.99:4200/verify/email/${token}</a></p>
                    <p>After that, please, go to <a href="http://192.168.43.99:4200/login">http://192.168.43.99:4200/login</a> Where you can login into the system.</p>
                    <p>Thank you for your interest in SocialChatNotes, If it was not you, just ignore this letter.</p>
                    <p>With best regards,<br/>SocialChatNotes Developer.</p>`, // html body
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
                    mssg: "congratulations user registered",
                    info: { username: data.username, email: data.email }
                });
            }
        });

    });
module.exports = router;