const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/register', async (req, res) => {
    
    try{
        const { username, email, password } = req.body;

        // Field empty check

        if(!username || !email || !password){
            return res.status(400).json({ error : 'All fields are required'})
        }

        // username / password aldready exists check

        const existingUsername = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });

        if (existingUsername || existingEmail) {
            return res.status(409).json({ error: 'The username or email already exists' });
        }

        // Hashing password suing bcrypt

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, email, hashedPassword });
        const savedUser = await user.save();

        res.status(201).json({message : 'User registered successfully.'});

    }catch(err){
        console.log("Error while registering user: ",err);   // Should improve. Invalid email is resulting in 500 error.
        res.status(500).json({error : 'An error occured'});
    }
});

router.post('/login', async (req, res) => {
    
    try{
        const { usernameOrEmail, password } = req.body;
        
        if(!usernameOrEmail || !password){
            return res.status(400).json({ error : 'All fields are required'})
        }

        const user = await User.findOne({ $or: [{username: usernameOrEmail}, {email: usernameOrEmail}] });

        if( !user || !(await bcrypt.compare(password, user.hashedPassword))) {
            return res.status(404).json({error : "Incorrect email or password."});
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        //console.log('Token is : ',token);
        return res.status(200).json({token});
        
    } catch( err ){
        //console.log("Error is : ",err);
        res.status(500).json({error : "Error while fetching data"});
    }
});

module.exports = router;