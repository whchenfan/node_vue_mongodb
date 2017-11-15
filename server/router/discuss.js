const express=require("express"),
	  router=express.Router(),
	  mongoose = require('mongoose'),
	  commBd=require("../mongoDB");
/*
	_id:mongoDB自己生成的主键值
	news_id:新闻id
	userName:
	userId:
	cont:回复的内容
	createTime:
	replaceId: 要回复的内容的编号
	replaceUserName:要回复的人
	
 */
router.post("/discussAdd",function(req,res){
	const news_id=req.body.news_id;
	const data={
		news_id,
		userName:req.body.userName,
		userId:req.body.userId,
		cont:req.body.cont,
		pic:req.body.pic,
		hidden:1,
		createTime:(new Date()).getTime()
	}
	
	commBd(function(error,db){
		const discuss=db.collection("discuss");
		const discussAdd=new Promise((resolve,reject)=>{
			discuss.insert(data,function(error,item){
				 if(error){
				 	reject({code:"0001",rsp:"发表评论失败,请从新发布!"})
				 }else{
				 	resolve(item);
				 }
			})	
		});
		//查询数据
		const hidden=1,
		  pageIndex=10,//每次显示二十条数据
		  page=parseInt(req.body.id)||1,
		  params={news_id,hidden};
		const countNum=new Promise((resolve,reject)=>
	    {
	    	discuss.find(params,{_id:1}).count((error,countNum)=>{
	    		if(error||countNum===0){
	    			reject({code:"0001",rsp:"暂无数据!"});
	    		}else{
	    			resolve(Math.ceil(countNum/pageIndex));
	    		}
	    	})
	    })
	    const pageData=new Promise((resolve,reject)=>{
	    	discuss.find(params).sort({createTime:-1})
		    .limit(pageIndex).skip((page-1)*pageIndex).toArray((error,item)=>{
		    	if(error){
		    		reject({code:"0002",rsp:"网络问题,请稍后再试!"});
		    	}else{
		    		resolve(item);
		    	}
		    })
	     })
	    Promise.all([discussAdd,countNum,pageData])
	    .then(data=>res.json({maxPage:data[1],data:data[2]}))
	    .catch(reason=>res.json(reason));
	})
});
router.post("/discuss",function(req,res){
	const news_id=req.body.news_id,
		  hidden=1,
		  pageIndex=10,//每次显示二十条数据
		  page=parseInt(req.body.index)||1,
		  params={news_id,hidden};
		
	commBd(function(error,db){
		const discuss=db.collection("discuss");
		const countNum=new Promise((resolve,reject)=>
	    {
	    	discuss.find(params,{_id:1}).count((error,countNum)=>{
	    		if(error||countNum===0){
	    			reject({code:"0001",rsp:"暂无数据!"});
	    		}else{
	    			resolve(Math.ceil(countNum/pageIndex));
	    		}
	    	})
	    })
	    const pageData=new Promise((resolve,reject)=>{
	    	discuss.find(params).sort({createTime:-1})
		    .limit(pageIndex).skip((page-1)*pageIndex).toArray((error,item)=>{
		    	if(error){
		    		reject({code:"0002",rsp:"网络问题,请稍后再试!"});
		    	}else{
		    		
		    		resolve(item);
		    	}
		    })
	     })
	    Promise.all([countNum,pageData])
	    .then(data=>res.json({maxPage:data[0],data:data[1]}))
	    .catch(reason=>res.json(reason))
	})	  
});
/*
	_id:mongoDB自己生成的主键值
	news_id:新闻id
	userName:
	userId:
	cont:回复的内容
	createTime:
	replaceId: 要回复的内容的编号
	replaceUserName:要回复的人
	
 */
router.post("/replaceAdd",function(req,res){
	const _id=mongoose.Types.ObjectId(req.body.id);
    commBd(function(error,db){
		const discuss=db.collection("discuss");
		const item1=new Promise((resolve,reject)=>{
			discuss.find({_id:_id}).toArray((error,item)=>{
				
				if(error||!item.length){
					reject({code:"0001",rsp:"暂无数据!"});
				}else{
				    resolve(item[0]);
				}
			})
		})
		Promise.all([item1]).then(value=>{
			
			discuss.insert({
				news_id:value[0].news_id,
				userName:req.body.userName,
				userId:req.body.userId,
				pic:req.body.pic,
				cont:req.body.cont,
				createTime:(new Date()).getTime(),
				replaceId:value[0]._id.toString(),
				replaceUserName:value[0].userName,
				replaceUserId:value[0].userId,
				hidden:1
			},function(error,item){
				
				if(item){
					res.json({code:"0000",rsp:"添加成功!"});
				}else{
					res.json({code:"0001",rsp:"添加失败!"});
				}
			})
		}).catch(reason=>{res.json(reason);})
	})
})

/*
	查看回复详情
 */
router.post("/replaceDiscuss",function(req,res){
	const 	id=req.body.id;
			_id=mongoose.Types.ObjectId(id);

	commBd(function(error,db){
		const discuss=db.collection("discuss");
		const item1=new Promise((resolve,reject)=>{
			discuss.find({_id:_id}).limit(1).toArray(function(error,item){
		
				if(error||!item.length){
					reject({code:"0001",rsp:"暂无数据!"});
				}else{

					resolve(item[0]);
				}
			});
		})
		const item2=new Promise((resolve,reject)=>{
			discuss.find({replaceId:id}).sort({createTime:-1}).toArray(function(error,item){
				
				if(error){
					reject({code:"0002",rsp:"查询回复有误!"})
				}else{
					resolve(item);
				}
			});
		});
		Promise.all([item1,item2]).then(value=>{
			res.json({data:value[0],listData:value[1]});
		}).catch(reason=>res.json(reason));

	})

})


module.exports=router

