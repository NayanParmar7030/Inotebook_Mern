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

module.exports = router;