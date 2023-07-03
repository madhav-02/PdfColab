const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();
const User = require('../models/User');
const Pdf = require('../models/Pdf');

// GET - Get all files of a particular user. Return the json.
router.get('/', authenticateToken, async (req, res) => {
    try{
        const userId = req.userId;
        //console.log("Request is : ",req.userId);
        const user = await User.findOne({_id: userId});
        if(!user){
            return res.status(404).json({error: 'User not found.'});
        }
        else{
            const uploadedPdfs = await Pdf.find({ uploadedBy : userId});
            return res.status(200).json(uploadedPdfs); 
        }
        
    } catch(err){
        console.log(err);
        res.status(500).json({error : 'Error while fetching data/ network'});
    }
});

module.exports = router;
