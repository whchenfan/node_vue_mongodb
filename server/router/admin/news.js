const express=require("express");
const router=express.Router();
const comdb=require("../../mongoDB.js");
const mongoose = require('mongoose');
const commJs=require('./commJs.js');

/*
{   标的结构
	_id:mongoDB自己生成的主键值
	title:分类的名称
	number:排序 数字
	description:类容描述
	keywords:关键词
	createTime:创建时间 (new Date()).getTime()
	updateTime:修改时间
	hidden:是否显示 1不显示 0显示
	pic:图片数组地址
	recommend: 首页新闻列表推荐 1推荐 0不推荐 
	recommendBanner:首页banner图推荐 1推荐 0不推荐 
	newsType{
		news_type新闻种类的表
	},
	userInfo:{
		那个用户添加的
		_id:
		name:
	}
	source：新闻来源
	sourceAddress:来源网站的名称
}
*/
//查询
router.post("/admin/newsFind",function(req, res){
	comdb(function(error,db){
        const collection = db.collection('news'),
            index=parseInt(req.body.index)||1,page=12
            params={};
        if(req.body.search.trim()){
        	params["title"]=new RegExp(req.body.search.trim());
        }
        if(parseInt(req.body.hidden)!==3){
        	params["hidden"]=parseInt(req.body.hidden);
        }
        if(req.body.newsType){
        	params["news_type._id"]=mongoose.Types.ObjectId(req.body.newsType)
        }    
        db.collection('news_type').find({}).toArray(function(error,newsItem){
          if(newsItem.length){
	        collection.find(params).count(function(error,item1){
	        	if(item1==0){
	        		 res.json({"code":"1112",rsp:"暂无数据",newsList:newsItem});
	        	}else{
		        	collection.find(params).sort({number:1,createTime:-1}).limit(page).skip((index-1)*page).toArray(function(err, item) {
			           if(err){
			                res.json({"code":"1111",rsp:"查询语句有问题！",newsList:newsItem})
			           }else{
			                if(!item.length){
			                    res.json({"code":"1112",rsp:"暂无数据",newsList:newsItem})
			                }else{
			                    res.json({list:item,maxPage:Math.ceil(item1/page),index:index,newsList:newsItem});
			                }   
			           }
			        })
	        	}

	        })
		    }else{
		    	 res.json({"code":"1112",rsp:"暂无数据",newsList:{}});
		    }
        })
    })
});
router.post("/admin/newsAdd",function(req,res){
	var imgArr=commJs.getSrc(req.body.content);
	if(req.body.imgScr===""&&req.body.imgScr.trim()!==""&&imgArr!==""){
		req.body.content=commJs.replaceImgSrc(req.body.content,imgArr,req.body.imgScr.trim());
		imgArr=imgArr.reduce(function(a,b){return a.concat(req.body.imgScr.trim()+b)},[]);

	}
	comdb(function(error,db){
        const collection = db.collection('news');
        const coll_type = db.collection('news_type');
        const news_id=mongoose.Types.ObjectId(req.body.type_id);
       coll_type.find({_id:news_id}).limit(1).toArray(function(error,itemType){
       		
       	
       		if(itemType.length){
	        	if(req.body.id){
	        		var data={
		        		title:req.body.title,
		        		content:req.body.content,
		        		updateTime:(new Date()).getTime(),
		        		number:parseInt(req.body.number)||1,
		        		hidden:1,
		        		description:req.body.description||req.body.title,
		        		keywords:req.body.keywords||req.body.title,
		        		news_type:itemType[0],
		        		source:req.body.source,
		        		sourceAddress:req.body.sourceAddress,
		        		pic:imgArr,
		        		recommend:parseInt(req.body.recommend),
		        		recommendBanner:parseInt(req.body.recommendBanner),
		        		userInfo:{
		        		   "id":req.body.userId,
		                   "userName":req.body.userName
		        		}	
		        	}
					var _id=mongoose.Types.ObjectId(req.body.id);
	        		collection.update({_id:_id},{$set:data},function(err,item){
	        			if(err){
		        			res.json({code:"1112",rsp:"修改数据的sql有问题！"});
		        		}else{
		        			res.json({code:"0000",rsp:"修改数据成功！"});
		        		}
	        		})
	        	}else{
	        		var data={
		        		title:req.body.title,
		        		content:req.body.content,
		        		createTime:(new Date()).getTime(),
		        		number:parseInt(req.body.number)||1,
		        		hidden:1,
		        		description:req.body.description||req.body.title,
		        		keywords:req.body.keywords||req.body.title,
		        		news_type:itemType[0],
		        		source:req.body.source,
		        		sourceAddress:req.body.sourceAddress,
		        		pic:imgArr,
		        		recommend:parseInt(req.body.recommend),
		        		recommendBanner:parseInt(req.body.recommendBanner),
		        		userInfo:{
		        		   "id":req.body.userId,
		                   "userName":req.body.userName
		        		}		
		        	}
	        		collection.insert(data,function(err,item){
		        		if(err){
		        			res.json({code:"1112",rsp:"添加数据的sql有问题！"});
		        		}else{
		        			res.json({code:"0000",rsp:"添加数据成功！"});
		        		}
	        		})	
	        	}	
       		}else{
       			res.json({code:"1113",rsp:"您选择的分类有问题！"});
       		}
			
       })
    });
});
//通过id查询数据
router.post("/admin/newsFindId",function(req,res){
	comdb(function(error,db){
        var collection = db.collection('news');
        var id=mongoose.Types.ObjectId(req.body.id);
       collection.find({_id:id}).limit(1).toArray(function(error,item){
       		
       		if(item.length){
       		 	res.json(item[0])
       		}else{
       			res.json({code:"1111","rsp":"通过您给的条件为能找到数据！"});
       		}
       })
    })
})
//通过id来修改number排序
router.post("/admin/numberChange",function(req,res){
	comdb(function(error,db){
        var collection = db.collection('news');
        var id=mongoose.Types.ObjectId(req.body.id);
        collection.update({_id:id},{$set:{number:parseInt(req.body.number)||1}},function(error,item){
       		if(error){
       		 	res.json({code:"1111","rsp":"修改数据失败，失败原因为sql语句有问题！"});
       		}else{
       			res.json({code:"0000","rsp":"修改数据成功！"});
       		}
        })
    })
})
//通过id来修改是否隐藏
router.post("/admin/showHide",function(req,res){
	comdb(function(error,db){
        var collection = db.collection('news');
        var id=mongoose.Types.ObjectId(req.body.id);
        collection.update({_id:id},{$set:{hidden:req.body.hidden==1?0:1}},function(error,item){
       		if(error){
       		 	res.json({code:"1111","rsp":"修改数据失败，失败原因为sql语句有问题！"});
       		}else{
       			res.json({code:"0000","rsp":"修改数据成功！"});
       		}
        })
    })

});



module.exports=router;