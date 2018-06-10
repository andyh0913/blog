import mongoose from 'mongoose';

var Article = mongoose.model('Article',{
  author: {
    type: String,
    required: true,
    minLength: 1
  },
  title: {
    type: String,
    default: 'No Title'
  },
  content: {
    type: String,
    required: true,
    minLength: 1
  },
  time: {
    type: Date,
    default: Date.now
  }
});

/**
 * empty the model when loaded
 */



export {Article};