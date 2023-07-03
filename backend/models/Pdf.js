const mongoose = require('mongoose');
const Comment = require('./Comment');

const pdfSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 50},
    description: { type: String, maxlength: 100 },
    file: { type: String, required: true }, // URL to the stored PDF file stored in S3
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
  }, {timestamps: true});
  
  const Pdf = mongoose.model('PDF', pdfSchema);
  
  module.exports = Pdf;