const express = require('express');
const { body, validationResult } = require('express-validator');

const Users = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const securekey = "Nayan@7030";
const fetchUsers = require('../middleware/fetchUser');

const router = express.Router();
// Route 1: Create User Endpoint code:  http://localhost:5000/api/auth/createuser
router.post("/createuser", [
    body('name').isLength(3),
    body('email').isEmail(),
    body('password').isLength(5),
], async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        let userfind = await Users.findOne({ email: req.body.email })

        if (userfind) {
            res.status(500).json({ message: "User Already exist" });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password,salt);
            req.body.password = securePassword;
            const user = new Users(req.body);
            await user.save();

            const data = {
                user:{
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, securekey);
            res.status(201).json({ message: "user created successfully", authToken: authToken });
        }

    } catch (error) {
        console.log("innnn");
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }


})

// Router 2: Login User Endpoint code start: http://localhost:5000/api/auth/login

router.post("/login", [
    body('email').isEmail(),
    body('password').isLength(5),
], async (req, res) => {

    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        const {email,password} = req.body;

        let userfind = await Users.findOne({ email: email })

        if (!userfind) {
            res.status(500).json({ message: "Email address is not found" });
        }

        const isMatch = await bcrypt.compare(password, userfind.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const data = {
            user:{
                id: userfind.id
            }
        }
        const authToken = jwt.sign(data, securekey);
        res.status(200).json({ message: "Login successfully", authToken: authToken });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
})


// Router 3: Get User Endpoint code start: http://localhost:5000/api/auth/getUser

router.post("/getuser", fetchUsers, async (req, res) => {
    try {
        console.log("Authenticated User ID:", req.user);
        const user = await Users.findById(req.user.id).select("-password"); 
        res.status(200).json({ user: user });
    } catch (error) {
        console.error("Error in /getuser:", error);
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;