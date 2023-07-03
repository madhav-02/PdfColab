const express = require('express');
const Pdf = require('../models/Pdf');
const Comment = require('../models/Comment');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();


// POST - Upload the pdf details in DB. This is after storting the file in S3.
router.post('/upload', authenticateToken, async (req, res) => {

    try{
        const {title, description, file} = req.body;
        const uploadedBy = req.userId;  // See middleware to understand.
        
        const pdf = new Pdf({
            title,
            description,
            file,
            uploadedBy
        });

        const savedPdf = await pdf.save();
        res.status(201).json(savedPdf);

    } catch(err){
        res.status(500).json(err);
    }
});


// POST - Add comment to an existing pdf

router.post('/comment', authenticateToken, async (req, res) => {
    try {
        
      const { pdfId, content } = req.body;
      const authorId = req.userId; 
  
      const pdf = await Pdf.findById(pdfId);
      if (!pdf) {
        return res.status(500).json({error: 'Inavlid PdfId. Pdf not found.'});
      }
  
      const comment = new Comment({
        content,
        pdfId,
        authorId
      });
  
      const savedComment = await comment.save();
      const updatedPdf = await Pdf.findByIdAndUpdate(pdfId,
        { $push : {comments : savedComment}},
        {new: true}
        );
      res.status(201).json({savedComment, updatedPdf});

    } catch (error) {
      res.status(500).json({ error: 'Failed to add comment' });
    }
  });


  // GET - Get all comments of a PDF file.
  router.get('/comment', authenticateToken, async (req, res) => {
    
    try{
        const { pdfId } = req.body;
        const pdf = await Pdf.findOne({_id : pdfId});
        const requestUserId = req.userId;
        
        if(!pdf){
            return res.status(404).json({error : 'Pdf not found'});
        }
        //console.log(pdf.uploadedBy.toString());
        if(requestUserId !== pdf.uploadedBy.toString()){
            return res.status(401).json({error : 'UnAuthorized access.'});
        }
        
        return res.status(200).json(pdf.comments);

    } catch( err ){
        console.log(err);
        return res.status(500).json({error: 'Server Error while fetching comments'});
    }

  });
  
module.exports = router;