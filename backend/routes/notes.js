const express = require('express');
const router = express.Router();
const Notes = require('../models/Note');
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require('express-validator');


//get the all notes
router.get('/fetchNotes', fetchuser, async (req, res) => {
   try {
      const Note = await Notes.find({ user: req.user.id });
      res.send(Note);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal Error Occured")
   }
})


//addNotes 
router.post('/AddNotes', [
   body('title').isLength({ min: 3 }),
   body('description').isLength({ min: 5 }),
], fetchuser, async (req, res) => {

   //here it is used t send the erro massage 
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   try {
      const { title, description, tag } = req.body;

      const note = new Notes({ title, description, tag, user: req.user.id });

      const save = await note.save()

      res.send(save);

   } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal Error Occured")
   }
})




// updates the current note
router.put('/UpdateNotes/:id', fetchuser, async (req, res) => {
   try {

      //yacking from the body 
      const { title, description, tag } = req.body;
      let newNote = {};

      //adding into the new object
      if (title) { newNote.title = title; }
      if (description) { newNote.description = description; }
      if (tag) { newNote.tag = tag; }

      //chechking for the note it exist or not 
      let note = await Notes.findById(req.params.id);
      if (!note) {
         return res.status(400).send("NotFound");
      }

      //checking for the user is him or any one else
      if (note.user.toString() != req.user.id) {
         return res.status(401).send("Exccess Denied");
      }
      
   
      note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
      res.send(note);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal Error Occured")
   }
})





// delete the notes
router.delete("/DeleteNotes/:id", fetchuser, async (req, res) => {
   try {
      
      //fetching the data of that note using the id of the that note 
      let note = await Notes.findById(req.params.id);
      if (!note) {
         return res.status(400).send("not Found");
      }

      //checking by fetching the is of the user with the current user
      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed");
      }

      //finally deleting the user
      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({ "Success": "deleted The Notes" });
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal Error Occured")
   }
})

module.exports = router;