import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

import {mongoose} from './mongoose.js';
import {Article} from './models/Article';
import {User} from './models/User'

var app = express();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge:  7 * 24 * 3600 * 1000, // save for a week
    secure: false
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/articles',(req,res)=>{
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

app.get('/articles',(req,res)=>{
  //console.log("get articles");
  Article.find().then((articles)=>{
    //console.log("articles found");
    res.send({articles});
  },(e)=>{
    console.log("articles not found");
    res.send(e);
  })
})

app.post('/signin',(req,res)=>{
  console.log(req.session);
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
    req.session.userId = 'user._id';
    console.log(req.session);
    res.send({user,success: true});
    //res.redirect("/");
  });
},(e)=>{
  console.log("signin failed");
  res.send(e);
});

app.post('/signup',(req,res)=>{
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

app.listen(3001, ()=>{
  console.log('Server listening on port 3001');
});