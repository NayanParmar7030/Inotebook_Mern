const express = require('express');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchUser');
const router = express.Router();
// Route 1: Fetch User Notes Endpoint code:  http://localhost:5000/api/notes/fetchnotes

router.get('/fetchnotes',fetchuser, async (req,res)=>{

    try {
        const notes = await Notes.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        console.error("Error in /getuser:", error);
        res.status(500).json({ message: error.message });
    }
    
});

// Route 2: Insert User Notes Endpoint code:  http://localhost:5000/api/notes/fetchnotes

router.post('/addnote',fetchuser,[
    body('title').isLength(3),
    body('title').isLength(5),
], async (req,res)=>{

    try {
        const {title,description,tag} = req.body;
        console.log("title",title);
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        const note = new Notes({
            title,description,tag,user:req.user.id
        });
        const saveNote = await note.save();
        res.json(saveNote);

    } catch (error) {
        console.error("Error in /getuser:", error);
        res.status(500).json({ message: error.message });
    }
    
});

// Route 3: Update User Note Endpoint code:  http://localhost:5000/api/notes/updatenote

router.put('/updatenote/:id',fetchuser, async (req,res)=>{
    const token = req.headers['auth-token'];
    
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
    
        const note = await Notes.findById(req.params.id);
        
        if(!note){
           return res.status(401).json("Note is not found");
        }

        if(note.user.toString() != req.user.id){
           return  res.status(401).json("You don't have permission to update this note");
        }

        const {title, description, tag} = req.body;

        const newNote = {};

        if(title) {newNote.title = title};
        if(description) {newNote.description = description};
        if(tag) {newNote.tag = tag};

       const updatedNote =  await Notes.findByIdAndUpdate(req.params.id, { $set: newNote },{new:true});

       return res.status(200).json({ message: "Note updated successfully", updatedNote });
    } catch (error) {
        res.status(500).json({ message11: error });
    }
    
});
module.exports = router;