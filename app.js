//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");

const homeStartingContent = "GitHub, Inc. is an American multinational corporation that provides hosting for software development and version control using Git. It offers the distributed version control and source code management (SCM) functionality of Git, plus its own features. It provides access control and several collaboration features such as bug tracking, feature requests, task management, and wikis for every project.[4] Headquartered in California, it has been a subsidiary of Microsoft since 2018";
const aboutContent = "GitHub, Inc. was originally a flat organization with no middle managers; in other words, everyone is a manager (self-management).[46] Employees could choose to work on projects that interested them (open allocation), but salaries were set by the chief executive.[47][needs update] In 2014, GitHub, Inc. introduced a layer of middle management.";
const contactContent = "Development of the GitHub.com platform began on October 19, 2007.[58][59][60] The site was launched in April 2008 by Tom Preston-Werner, Chris Wanstrath, P. J. Hyett and Scott Chacon after it had been made available for a few months prior as a beta release.[61]";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let posts=[];

app.get("/",function(req,res){
  res.render('home',{
    StartingContent:homeStartingContent,
    posts:posts});
});
app.get("/about",function(req,res){
  res.render('about',{aboutcontent:aboutContent});
});
app.get("/contact",function(req,res){
  res.render('contact',{contactcontent:contactContent});
});
app.get("/compose",function(req,res){
  res.render('compose');
});
app.post("/compose",function(req,res){
  const post={
    title:req.body.posttitle,
    content:req.body.postbody
  };
  posts.push(post);
  res.redirect("/");

});
app.get("/posts/:postName",function(req,res){
  const requested=(_.lowerCase(req.params.postName));
  posts.forEach(function(post){
    const storedTitle=_.lowerCase(post.title);
    if(storedTitle===requested){
      res.render("post",{
        title:post.title,
        content:post.content
      });
    }
  });
});













app.listen(3000, function() {
  console.log("Server started on port 3000");
});
