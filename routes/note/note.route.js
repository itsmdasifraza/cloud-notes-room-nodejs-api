var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const authToken = require('../../middlewares/auth-token');

var userModel = require('../../models/user/user.model');
var noteModel = require('../../models/note/note.model');
var listModel = require('../../models/list/list.model');

function createSlug(title){
	let slug = title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
	return slug;
}

////////////////////////////////////////////////
//           Route for create note            //
////////////////////////////////////////////////
router.post('/create',
    body('title', 'title must be minimum 2 character').trim().isLength({ min: 2 }),
    body('privacy', 'description must be minimum 1 character').trim().isLength({ min: 1 }), authToken,
    async (req, res) => {

        const errors = validationResult(req);

        // throw validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
		
		let slug = createSlug(req.body.title);
		if(req.body.description == "") req.body.description = "No description!";
        
		// creating note object
        let note = new noteModel({
            userid: req.userid,
            title: req.body.title,
            description: req.body.description,
            privacy: req.body.privacy,
			slug: slug
        });

        //pushing user object to mongo
        note.save(function (err, data) {
            if (err)
                return res.status(500).json({
                    error: '500',
                    mssg: "internal server error"
                });
            else {
                return res.status(200).json({
                    success: '200',
                    mssg: "congratulations note created",
                    data: data
                });
            }
        });
    });
////////////////////////////////////////////////
//           Route for edit note              //
////////////////////////////////////////////////
router.post('/edit/:noteid',
    body('title', 'title must be minimum 2 character').trim().isLength({ min: 2 }),

    body('privacy', 'description must be minimum 1 character').trim().isLength({ min: 1 }), authToken,
    async (req, res) => {

        const errors = validationResult(req);

        // throw validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try{
			
		let slug = createSlug(req.body.title);
		if(req.body.description == "") req.body.description = "No description!";
        // creating update chat object
        let updateNote = {
            title: req.body.title,
            description: req.body.description,
            privacy: req.body.privacy,
			slug: slug
        }
        let updateNoteData = await noteModel.findOneAndUpdate({_id : req.params.noteid , userid : req.userid   },updateNote);
        
         if(!updateNoteData){
            return res.status(404).json({error:'404',
            mssg:"note not exist",
           });
         }       
		 else{
			 return res.status(200).json({success:'200',
				 mssg: "note detail changed",
				 data : slug
			});
		 }
         }
         catch{
            return res.status(500).json({error:'500',
            mssg:"Internal server error",
           });
         }
         

      
    });
////////////////////////////////////////////////
//             Route for read notes           //
////////////////////////////////////////////////
router.get('/read',
    authToken,
    async (req, res) => {

        // find all the notes with their userid
        try {
            let note = await noteModel.find({ userid: req.userid });
           
            if(note){
				return res.status(200).json({
            success: '200',
            mssg: "all notes retrieved",
            data: note
        });
			}
			else {
                return res.status(404).json({
                    error: '404',
                    mssg: "notes not found"
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
//             Route for public note          //
////////////////////////////////////////////////
router.get('/read/public/:username',
   
    async (req, res) => {

        // find all the chat with their userid
        try {
            let user = await userModel.findOne({ username: req.params.username});
            if (!user) {
                return res.status(404).json({
                    error: '404',
                    mssg: "User not exist"
                });
            }
                  let notes = await noteModel.find({ userid: user._id , privacy : 'public'});
                
                    if (!notes) {
                        return res.status(404).json({
                            error: '404',
                            mssg: "no public notes"
                        });
                    }
					else{
						return res.status(200).json({
							success: '200',
							mssg: "Public notes retrieved",
							data: notes
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
//           Route for read one note          //
////////////////////////////////////////////////
router.get('/read/:slug',
    authToken,
    async (req, res) => {

        // find all the chat with their userid
        try {
            let note = await noteModel.findOne({ slug: req.params.slug, userid: req.userid });
			if(!note){
				return res.status(404).json({
					error: '404',
					mssg: "note not found"
				});
			}
			else{
				return res.status(200).json({
					success: '200',
					mssg: "note retrieved",
					data: note
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
//           Route for delete note            //
////////////////////////////////////////////////
router.get('/delete/:noteid',
    authToken,
    async (req, res) => {

        // delete note with logged in userid and noteid 
        try {
            let listExist = await listModel.deleteMany({ noteid: req.params.noteid, userid: req.userid });
            let noteExist = await noteModel.findOneAndDelete({ _id: req.params.noteid, userid: req.userid });
            // console.log(chatExist)
            if (!noteExist) {
                return res.status(404).json({
                    error: '404',
                    mssg: "note not found"
                });
            }
			else{
				return res.status(200).json({
					success: '200',
					mssg: "note deleted with their lists",
					info: noteExist
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

module.exports = router;