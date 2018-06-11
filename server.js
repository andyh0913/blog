import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
var config = require('./webpack.config');
var compiler = webpack(config);

import {mongoose} from './mongoose.js';
import {Article} from './models/Article';
import {User} from './models/User'

var app = express();

app.use(express.static(path.join(__dirname, '/')))

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));



app.use(session({
  secret: 'secfadffret',
  cookie: {
    maxAge:  60 * 1000
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
})

app.post('/data/articles',(req,res)=>{
  console.log(req.body);
  var article = new Article({
    author: req.body.author,
    content: req.body.content,
    title: req.body.title
  });

  article.save().then((doc)=>{
    console.log("article saved");
    res.send(doc);
  },(e)=>{
    console.log("save failed");
    res.send(e);
  })
});

app.get('/data/articles',(req,res)=>{
  //console.log("get articles");
  Article.find().then((articles)=>{
    //console.log("articles found");
    res.send({articles});
  },(e)=>{
    console.log("articles not found");
    res.send(e);
  })
})

app.post('/data/signin',(req,res)=>{
  console.log(req.session, 'signin');
  if(req.session.userId){
    console.log("yes");
    return res.send({user,success: true});
  }
  User.findOne({account: req.body.account,password: req.body.password},(err,user)=>{
    if (err) {
      res.send(err);
      return console.log("sign in error",err);
    }
    if (!user) {
      res.send({success: false});
      return console.log("user not exist or wrong password");
    }
    console.log("user._id is " + user._id);
    req.session.userId = user._id;
    req.session.save(() => {
      res.send({user,success: true});
    });
    console.log(req.session);
    
    //res.redirect("/");
  });
},(e)=>{
  console.log("signin failed");
  res.send(e);
});

app.post('/data/signup',(req,res)=>{
  User.findOne({account: req.body.account,password: req.body.password},(err,user)=>{
    if (err) {
      res.send(err);
      return console.log("sign up error",err);
    }
    if (user) {
      res.send({exist: true});
      return console.log("user existed");
    }
    var newUser = new User();
        newUser.account = req.body.account;
        newUser.password = req.body.password;
        newUser.username = req.body.username;
        newUser.save().then((user)=>{
          console.log("user created");
          res.send(user);
        },(err)=>{
          console.log("sign up failed");
          res.send(err);
        })
  });
},(err)=>{
  console.log("signup failed");
  res.send(err);
});

app.listen(3000, ()=>{
  console.log('Server listening on port 3000');
});