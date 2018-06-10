import mongoose from 'mongoose';

var User = mongoose.model('User',{
  username: {
    type: String,
    required: true,
    minLength: 1
  },
  account: {
    type: String,
    required: true,
    minLength: 1
  },
  password: {
    type: String,
    required: true,
    minLength: 1
  }
});

/**
 * empty the model when loaded
 */


export {User};