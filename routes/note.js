var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const authToken = require('../middlewares/auth-token');

var chatModel = require('../models/chat');
var noteModel = require('../models/note');


////////////////////////////////////////////////
//           Route for create note            //
////////////////////////////////////////////////
router.post('/create/:chatid',
   body('message', 'message must be minimum 1 character').trim().isLength({ min: 1 }),
   authToken,
   async (req, res) => {

      const errors = validationResult(req);

      // throw validation errors
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      // console.log(req.userid);
      // check chat with logged in userid already exist or not
      try {
         let chatExist = await chatModel.findOne({ _id: req.params.chatid, userid: req.userid });
         //  console.log(chatExist)
         if (!chatExist) {
            return res.status(404).json({
               error: '404',
               mssg: "chat not found"
            });
         }
      }
      catch {
         return res.status(404).json({
            error: '404',
            mssg: "chat not found"
         });
      }
      let date = new Date();
      // creating note object
      var newNote = new noteModel({
         userid: req.userid,
         chatid: req.params.chatid,
         message: req.body.message,
         stamp: {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
         }
      });


      //pushing note object to mongo
      newNote.save(function (err, data) {
         if (err)
            return res.status(500).json({
               error: '500',
               mssg: "internal server error"
            });
         else {
            return res.status(200).json({
               success: '200',
               mssg: "congratulations note created",
               info: data
            });
         }
      });

   });


////////////////////////////////////////////////
//             Route for read note            //
////////////////////////////////////////////////
router.get('/read/:chatid',
   authToken, 
   async (req, res) => {

      // find all the note with their userid and chatid
      try {
         var noteData = await noteModel.find({ userid: req.userid, chatid: req.params.chatid });
         //  console.log(noteData)
         if (!noteData || noteData.length == 0) {
            //check if chat is public or not
            try {
               var verifyChat = await chatModel.findOne({ _id: req.params.chatid, protected: 'false' });
            //  console.log(verifyChat);

               if (!verifyChat) {
                  return res.status(404).json({
                     error: '404',
                     mssg: "anonymous access to private chat 1",
                     owner: "false"
                  });
               }
               else{
                  try {
                     noteData = await noteModel.find({ chatid: req.params.chatid });
                     if (!noteData || noteData.length == 0) {
                        return res.status(404).json({
                           error: '404',
                           mssg: "public chat has no notes",
                           owner: "false"
                        });
                     }
                  }
                  catch {
                     return res.status(404).json({
                        error: '404',
                        mssg: "internal server error",
                        owner: "false"
                     });
                  }
                  return res.status(200).json({
                     success: '200',
                     mssg: "all public notes retrieved",
                     data: noteData,
                     owner: "false"
                  });
               }
            }
            catch {
               return res.status(404).json({
                  error: '404',
                  mssg: "anonymous access to private chat 2",
                  owner: "false"
               });
            }

         }
      }
      catch {
         return res.status(404).json({
            error: '404',
            mssg: "internal server error"
         });
      }
      return res.status(200).json({
         success: '200',
         mssg: "all notes retrieved",
         data: noteData,
         owner: "true"
      });
   });

////////////////////////////////////////////////
//           Route for delete note            //
////////////////////////////////////////////////
router.get('/delete/:chatid/:noteid',
   authToken,
   async (req, res) => {


      // console.log(req.userid);
      // check note with logged in userid and chatid already exist or not
      try {
         var noteExist = await noteModel.findOneAndDelete({ _id: req.params.noteid, userid: req.userid, chatid: req.params.chatid });
         //   console.log(noteExist)
         if (!noteExist) {
            return res.status(404).json({
               error: '404',
               mssg: "note not found"
            });
         }
      }
      catch {
         return res.status(404).json({
            error: '404',
            mssg: "note not found"
         });
      }
      return res.status(200).json({
         success: '200',
         mssg: "note deleted", info: noteExist
      });
   });

module.exports = router;