require('dotenv').config()
var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');
var jwtSecret = process.env.JWT_SECRET;

var userModel = require('../models/user');

const transporter = nodemailer.createTransport({
     host: 'smtp-mail.outlook.com',
	secureConnection: false, // TLS requires secureConnection to be false
    port: 587,
	tls: {
       ciphers:'SSLv3'
    },
    //secure: false,
    //requireTLS: true,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD
    }
});

router.post('/',
    body('email', 'email must be valid').isEmail(),   
    async (req, res) => {
        const errors = validationResult(req);

        // throw validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            //check email already exist or not
            let emailExist = await userModel.findOne({ email: req.body.email , verified : true });
            if (emailExist) {
            //    console.log(emailExist);
               let jwtData = {
                id : emailExist._id   
                }
                let token = jwt.sign( jwtData, jwtSecret);
                // send mail with defined transport object
                let info = transporter.sendMail({
                   from: `${process.env.APP_NAME} <${process.env.SENDER_EMAIL}>`, // sender address
                    to: req.body.email, // list of receivers
                    subject: `Force login your account in just one simple step`, // Subject line
                    html: `<p>Hello <b>${emailExist.username}</b>!</p>
                    <p>A request has been raised to force login your account, to continue the process just follow the link below: <br/><br/> <a href="${process.env.FRONTEND_CONNECTION}://${process.env.FRONTEND_IP}/forgot-password/force/login/${token}">${process.env.FRONTEND_CONNECTION}://${process.env.FRONTEND_IP}/forgot-password/force/login/${token}</a>.</p>
                    
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
                    mssg: `Force login link sent on your email ${req.body.email}, please click the link to access your account.`,
                });
            }
            else{
                return res.status(400).json({
                    error: 'request failed',
                    mssg: "email not registered or not verified"
                });
            }
        } catch {
            return res.status(404).json({
                error: '404',
                mssg: "internal server error",
            });
        }
       

    });
module.exports = router;