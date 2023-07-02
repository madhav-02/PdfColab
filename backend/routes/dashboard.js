const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();
const User = require('../models/User');

router.get('/', authenticateToken, async (req, res) => {
    try{
        const userId = req.userId;
        console.log("Request is : ",req.userId);
        const user = await User.findOne({_id: userId});
        if(user){
            return res.status(200).json({username: user.username});
        }
        else{
            console.log("No user");
        }
        
    } catch(err){
        console.log(err);
        res.status(500).json({error : 'Error while fetching data/ network'});
    }
});

module.exports = router;
