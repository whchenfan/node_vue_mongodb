const express=require("express");
const router=express.Router();
const mongoose = require('mongoose');
const comdb = require('../mongoDB');
router.post("/page",function(rep,res){
	
      comdb(function(error,db){
      	const news=db.collection("news"),
      		  news_type=db.collection("news_type");
      	const p1=new Promise((resolve, reject) => { 
      		news_type.find({hidden:1},{title_type:1,createTime:1,pic:1}).sort({number:-1,createTime:1})
      		.toArray(function(error,item){
      			if(error){
      				reject({code:"0001",rsp:"查询数据失败"});
      			}else{
      				resolve(item);	
      			}
      		})
      	}) 
      	const banner=new Promise((resolve, reject) => { 
      		news.find({pic:{$nin:[null,""]},recommendBanner:1,hidden:1},{title:1,createTime:1,pic:1,content:1}).sort({number:1,createTime:-1}).limit(6).toArray(function(error,item){
        			if(error){
      					reject({code:"0001",rsp:"查询数据失败"});
      				}else{
        				resolve(item);	
        			}
       			 })
      	}) 
      	const listData=new Promise((resolve, reject) => { 
      		news.find({recommend:1,hidden:1},{title:1,createTime:1,pic:1,content:1}).sort({number:-1,createTime:1}).limit(3).toArray(function(error,item){
    			if(error){
  					reject({code:"0001",rsp:"查询数据失败"});
  				}else{
    				resolve(item);	
    			}
       		 })
      	 }) 
      	Promise.all([p1,banner,listData])
      	.then((value)=>{
      		res.json({newsType:value[0],banner:value[1],news:value[2]});
      	})
      	.catch((reason)=>{res.json(reason)})
	});

	
})
//新闻页面
router.post("/news",function(rep,res){
	const index=parseInt(rep.body.index||1),
        id=rep.body.id,
		    page=10;

	comdb(function(error,db){
      	const news=db.collection("news");
        var term={hidden:1};
       if(id){
          term["news_type._id"]=mongoose.Types.ObjectId(id);
        }
     
        //查询满足条件的所有数据
        const countNub=new Promise((resolve,reject)=>{
           news.find(term,{_id:1}).count(function(error,itemCount){
                if(!itemCount){
                     reject({code:"0002","rsp":"未查询到数据!"}); 
                }else{
                     resolve(itemCount);
                }
               
           }); 
        });  
        //插叙满足条件的分页数据
        const itemData=new Promise((resolve,reject)=>{
          news.find(term,{title:1,createTime:1,pic:1,content:1}).sort({number:1,createTime:-1}).limit(page).skip((index-1)*page).toArray(function(error,item){
              if(error){
                 reject({code:"0001","rsp":"系统出错"}) 
              }else if(!item){
                 reject({code:"0002","rsp":"未查询到数据!"}) 
              }else{
                 resolve(item);
              } 
          })
        })
        //处理好的数据返回前端
         Promise.all([countNub,itemData])
        .then(item=>{res.json({newsDate:item[1],maxPage:Math.ceil(item[0]/page),index:index})})
        .catch((reason)=>{res.json(reason)});
	});
})
//获取产品详情
router.post("/newsDetailed",function(req,res){
  comdb(function(error,db){

      const news=db.collection("news"),
            discuss=db.collection("discuss"),
            id=mongoose.Types.ObjectId(req.body.id);
      const newsData =new Promise((resolve,reject)=>{
          news.find({_id:id}).limit(1).toArray(function(err,item){
               if(error){
                  reject({code:"0001",rsp:"通过您给的条件没有查到先关数据!"})
               }else{
                  resolve(item[0]);
               }
          });
      });    
      const discussCount=new Promise((resolve,reject)=>{
          discuss.find({news_id:req.body.id,hidden:1})
          .count(function(error,item){
              if(error){
                reject({code:"0002",rsp:"查询评论条数失败!"});
              }else{
                 resolve(item);
              }
          }) 
      })
      Promise.all([newsData,discussCount]).then(
          value=>{
            value[0].count=value[1];
            res.json({Detailed:value[0]})
          }
      )

  })

})
router.post("/newsType",function(req,res){
    comdb(function(error,db){
      db.collection("news_type").find({hidden:1},{title_type:1})
      .sort({number:1,createTime:-1}).toArray(function(err,item){
           
          res.json(item);
      })

    })

});
router.get("/news",function(req,res){
	
})
module.exports=router;