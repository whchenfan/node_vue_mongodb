const express = require('express');

const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const ueditor = require("ueditor");
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json 
app.use(bodyParser.json());
app.use(express.static('src'));

app.use("/admin/ueditor/ue", ueditor(path.join(__dirname.replace("server","src")), function(req, res, next) {

  // ueditor 客户发起上传图片请求

  if(req.query.action === 'uploadimage'){

    // 这里你可以获得上传图片的信息
    var foo = req.ueditor;
    // 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径）
    var img_url = "/images/uploade/";
    res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
   
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage'){
    var dir_url = '/images/uploade/'; // 要展示给客户端的文件夹路径
    res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
     
  }
  // 客户端发起其它请求
  else {

    res.setHeader('Content-Type', 'application/json');
    // 这里填写 ueditor.config.json 这个文件的路径
    res.redirect('/admin/ueditor/ueditor.config.json')
}}));




const index=require("./router/index");
const about=require("./router/about");

app.use(index);
app.use(about);
//后台页面
//用户后台页面
const admin=require("./router/admin/admin");
app.use(admin);
//新闻种类后台页面
const newsType=require("./router/admin/newsType");
app.use(newsType);
//新闻中心后台页面
const news=require("./router/admin/news");
app.use(news);
//查看评论
const adminDiscuss=require("./router/admin/discuss");
app.use(adminDiscuss);
//前端显示
//用户
const foreEndAdmin=require("./router/admin");
app.use(foreEndAdmin);
//新闻
const foreEndNews=require("./router/news");
app.use(foreEndNews);
//评论
const discuss=require("./router/discuss");
app.use(discuss);
app.listen(8000,function(){
  console.log("启动服务器 localhost:8000");
});