import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://web2018:web2018@ds159100.mlab.com:59100/blog');

export {mongoose};