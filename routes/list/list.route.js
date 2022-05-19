var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const authToken = require('../../middlewares/auth-token');

var noteModel = require('../../models/note/note.model');
var listModel = require('../../models/list/list.model');
var userModel = require('../../models/user/user.model');


////////////////////////////////////////////////
//           Route for create list            //
////////////////////////////////////////////////
router.post('/create/:noteid',
   body('message', 'message must be minimum 1 character').trim().isLength({ min: 1 }),
   authToken,
   async (req, res) => {

      const errors = validationResult(req);
      // throw validation errors
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      try {
         let noteExist = await noteModel.findOne({ _id: req.params.noteid, userid: req.userid });
		 if(noteExist){
			  // creating list object
			  let list = new listModel({
				 userid: req.userid,
				 noteid: req.params.noteid,
				 message: req.body.message,
			  });
			  // pushing list object to mongo
			  list.save(function (err, data) {
				 if (err)
					return res.status(500).json({
					   error: '500',
					   mssg: "Something went wrong"
					});
				 else {
					return res.status(200).json({
					   success: '200',
					   mssg: "congratulations note created",
					   info: data
					});
				 }
			  });
		 }
         else{
            return res.status(404).json({
               error: '404',
               mssg: "note not found"
            });
         }
      }
      catch {
         return res.status(500).json({
            error: '500',
            mssg: "Internal server error"
         });
      }
 
      

   });


////////////////////////////////////////////////
//             Route for read list            //
////////////////////////////////////////////////
router.get('/read/:username/:slug',
   authToken, 
   async (req, res) => {

      // find all the list with their userid and noteid
      try {
		  let user = await userModel.findOne({ username:req.params.username });
		  if(!user){
			  return res.status(404).json({
				error: '404',
				mssg: "Username not found"
				});
		  }
		  let note = await noteModel.findOne({ userid : user._id, slug : req.params.slug });
		  if(!note){
			  return res.status(404).json({
				error: '404',
				mssg: "note not found"
				});
		  }
         let lists = await listModel.find({ noteid: note._id });
		 if(user._id == req.userid){
			 
			  return res.status(200).json({
				 success: '200',
				 mssg: "all notes & lists retrieved",
				 data: note,
				 data2: lists,
				 owner: true
			  });
		 }
		 else if(note.protected == false){
			 return res.status(200).json({
				 success: '200',
				 mssg: "all notes & lists retrieved",
				 data: note,
				 data2: lists,
				 owner: false
			  });
		 }
		 else{
			  return res.status(404).json({
				 error: '404',
				 mssg: "unauthorized"
			  });
		 }
      }
      catch {
         return res.status(500).json({
           error: '500',
            mssg: "internal server error"
         });
      }
     
   });

////////////////////////////////////////////////
//           Route for delete list            //
////////////////////////////////////////////////
router.get('/delete/:noteid/:listid',
   authToken,
   async (req, res) => {


      // console.log(req.userid);
      // check note with logged in userid and chatid already exist or not
      try {
         let listExist = await listModel.findOneAndDelete({ _id: req.params.listid, userid: req.userid, noteid: req.params.noteid });
         if (listExist) {
            return res.status(200).json({
				success: '200',
				mssg: "list deleted", 
				info: listExist
			});
         }
		 else{
			return res.status(404).json({
               error: '404',
               mssg: "list not found"
            }); 
		 }
      }
      catch {
         return res.status(500).json({
            error: '404',
            mssg: "Internal server error"
         });
      }
      
   });

module.exports = router;