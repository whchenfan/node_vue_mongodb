const express=require("express");
const router=express.Router();
const comdb=require("../../mongoDB.js");
const mongoose = require('mongoose');
/*
    _id:mongoDB自己生成的主键值
    title_type:分类的名称
    number:排序 数字
    description:类容描述
    createTime:创建时间 (new Date()).getTime()
    updateTime
    hidden:是否显示 1不显示 0显示
    userInfo:{
        那个用户添加的
        _id:
        name:
    }
 */
//查询新闻分类
router.post('/admin/newsTypeFind', function(req, res) {
    comdb(function(error,db){
      
        const collection = db.collection('news_type');
        var data={};
        if(req.body.search.trim()!=""){
           data["title_type"]=new RegExp(req.body.search);
        }
        if(req.body.hidden!=3){
          data["hidden"]=parseInt(req.body.hidden);
        }
        collection.find(data).sort({number:1,createTime:-1}).toArray(function(err, item) {
          
           if(err){
                 res.json({"code":"1111",rsp:"查询语句有问题！"})
           }else{

                if(!item.length){
                    res.json({"code":"1112",rsp:"暂无数据"})
                }else{
                  
                    res.json(item);
                }   
           }
        })
    })
});
//查询新闻分类只需要_id,title_type
router.post("/admin/newsFindIdTitle",function(req,res){
   comdb(function(error,db){
        var collection = db.collection('news_type');
        collection.find({hidden:1},{_id:1,title_type:1}).sort({number:-1,createTime:1}).toArray(function(err, item) {
           if(err){
                 res.json({"code":"1111",rsp:"查询语句有问题！"})
           }else{
              
                if(!item.length){
                    res.json({"code":"1112",rsp:"暂无数据"})
                }else{
                   
                    res.json(item);
                }   
           }
        })
    })

})
//添加新闻分类
router.post('/admin/newsTypeAdd', function(req, res) {

	comdb(function(error,db){
    	var collection = db.collection('news_type');
        if(!req.body.id){
             var data={
                "title_type":req.body.title,
                "keywords":req.body.keywords||req.body.title,
                "description":req.body.description||req.body.title,
                "createTime":(new Date()).getTime(),
                "hidden":1,
                "number":parseInt(req.body.number)||1,
                "pic":req.body.pic,
                "userInfo":{
                   "id":req.body.userId,
                   "userName":req.body.userName
                }
            }

           collection.insert(data, function(err, result) {
                if(err){
                    res.json({"code":"1111",rsp:"添加数据失败"});
                }else{
                    res.json({"code":"0000",rsp:"添加数据成功"});
                }
            }) 
        }else{
           var data={
                "title_type":req.body.title,
                "keywords":req.body.keywords||'',
                "description":req.body.description||'',
                "updateTime":(new Date()).getTime(),
                "number":parseInt(req.body.number)||1,
                "pic":req.body.pic||''
            }
           const _id=mongoose.Types.ObjectId(req.body.id);
           collection.update({_id:_id},{$set:data},function(err, item) {
               if(err){
                   res.json({"code":"1111",rsp:"查询语句有问题！"})
               }else{
                   res.json({"code":"0000",rsp:"修改数据成功！"})
               }
            }) 
        }
  		
    })
    
});
//通过主键来修改 number值
router.post('/admin/newsTypeNumber',function(req,res){
    comdb(function(error,db){
        const collection = db.collection('news_type');
        const _id=mongoose.Types.ObjectId(req.body._id);
        collection.update({_id:_id},{$set:{number:parseInt(req.body.number)}},function(err, item) {
           if(err){
                 res.json({"code":"1111",rsp:"修改数据失败！"});
           }else{
                res.json({"code":"1111",rsp:"修改数据成功！"});
           }
        })
    })
})
//通过主键值 让改新闻分类是否能在前端显示
router.post('/admin/newsTypeHide',function(req,res){
    comdb(function(error,db){
      console.log(req.body.id);
        const collection = db.collection('news_type');
        const _id=mongoose.Types.ObjectId(req.body.id);
      console.log({_id:_id},{$set:{hidden:req.body.hidden==1?0:1}});
        collection.update({_id:_id},{$set:{hidden:req.body.hidden==1?0:1}},function(err, item) {
           if(err){
                 res.json({"code":"1111",rsp:"查询语句有问题！"});
           }else{
                if(req.body.hidden==1){
                   const news=db.collection('news');
                    news.update({"news_type._id":_id},{$set:{hidden:req.body.hidden==1?0:1}},{multi: true, upsert: false},function(err, item) {
                         
                         if(err){
                             collection.update({_id:_id},{$set:{hidden:1}},function(err, item) {
                                 res.json({"code":"1111",rsp:"修改数据失败，修改下级分类sql有问题"});
                              })
                          
                         }else{
                             res.json({"code":"0000",rsp:"修改成功，下级分类也修改完成！"})
                         }
                    })
                }else{
                   res.json({"code":"0000",rsp:"修改数据成功！"})
                }  
              
           }
        })
    })
})
//通过主键查询 数据
router.post('/admin/newsTypeFindId',function(req,res){
    comdb(function(error,db){
        const collection = db.collection('news_type');
      
        const _id=mongoose.Types.ObjectId(req.body.id);

        collection.find({_id:_id}).toArray(function(err, item) {
           if(err){
                 res.json({"code":"1111",rsp:"查询语句有问题！"})
           }else{
                if(item.length){
                   res.json(item); 
               }else{
                    res.json({"code":"1112",rsp:"通过您给的值未查到数据！"}); 
               }
               
           }
        })
    })
})
module.exports=router;

