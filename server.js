import express from 'express';
import bodyParser from 'body-parser';

import {mongoose} from './mongoose.js';
import {Article} from './models/Article';

var app = express();

app.use(bodyParser.json());

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

app.listen(3001, ()=>{
  console.log('Server listening on port 3001');
});