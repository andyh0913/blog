import express from 'express';
import bodyParser from 'body-parser';

import {mongoose} from './mongoose.js';
import {Article} from './models/Article';
import {User} from './models/User'

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/newpost',(req,res)=>{
  console.log(req.body);
  var article = new Article({
    author: req.body.author,
    content: req.body.content,
    title: req.body.title
  });

  article.save().then((article)=>{
    console.log("article saved");
    res.send({article});
  },(e)=>{
    console.log("save failed");
    res.send(e);
  })
});

app.post('/delete',(req,res)=>{
  Article.deleteOne({_id:req.body._id},(err)=>{
    if (err) {
      res.send(err);
      return console.log("article delete err",err);
    }
    res.send({success: true});
  });
},(e)=>{
  console.log("delete failed");
  res.send(e);
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
      res.send({user,success: false});
      return console.log("user existed");
    }
    var newUser = new User();
        newUser.account = req.body.account;
        newUser.password = req.body.password;
        newUser.username = req.body.username;
        newUser.save().then((user)=>{
          console.log("user created");
          res.send({user,success: true});
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