const express= require("express"),
	  router=express.Router(),
	  mongoose = require('mongoose'),
	  commDb=require("../../mongoDB");
router.post("/admin/discuss",function(req,res){
	var params={};
	const pageNum=12,
		  index=parseInt(req.body.index)||1,
		  news_id=req.body.id,
		  hidden=parseInt(req.body.hidden===""?3:req.body.hidden);
	commDb(function(error,db){
		const discuss=db.collection("discuss");
		params["news_id"]=news_id;
		if(hidden!=3)params["hidden"]=hidden;
		if(req.body.search.trim()!=="")params["cont"]=new RegExp(req.body.search.trim());
		const count=new Promise((resolve,reject)=>{
			discuss.find(params).count(function(error,countNum){
				if(error){
					reject({code:"0002",rsp:"查询数据条件有误!"});
				}else{
					resolve(countNum);
				}
			});
		});
		const listData=new Promise((resolve,reject)=>{
			discuss.find(params).sort({createTime:-1})
			.limit(pageNum).skip((index-1)*pageNum).toArray(function(error,item){
				if(error){
					reject({code:"0001",rsp:"查询分页数据条件有误!"});
				}else{

					resolve(item);
				}
			})
		});
		Promise.all([count,listData]).then(
			value=>{ res.json({"listData":value[1],maxPage:Math.ceil(value[0]/pageNum)});}
		).catch(reason=>{res.json(reason);})

	});
});
//显示隐藏评论
// /admin/discussShowHide
router.post("/admin/discussShowHide",function(req,res){
	commDb(function(error,db){
		const discuss=db.collection("discuss"),
			  hidden=parseInt(req.body.hidden),
			  id=mongoose.Types.ObjectId(req.body.id);	
	    discuss.update({_id:id},{$set:{hidden:hidden}},function(error,item){
	    	if(error){
	    		res.json({code:"0001",rsp:"修改数据失败!"})
	    	}else{
	    		res.json({code:"0000",rsp:"修改数据成功!"});
	    	}
	    })
	})
});
//查询某条评论
router.post("/admin/discussInfo",function(req,res){
	commDb(function(error,db){
		const  discuss=db.collection("discuss"),
			   id=mongoose.Types.ObjectId(req.body.id);	
	    discuss.find({_id:id}).limit(1).toArray(function(error,item){
	    	if(item.length){
	    		
	    		res.json(item[0]);
	    	}else{
	    		res.json({});
	    	}
	    })

	});
})

module.exports=router;