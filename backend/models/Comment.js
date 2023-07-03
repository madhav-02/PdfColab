const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  pdfId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pdf' },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;