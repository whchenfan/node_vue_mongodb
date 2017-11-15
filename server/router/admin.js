const express=require("express");
const router=express.Router();
const comdb=require("../mongoDB");
const crypto = require('crypto');

router.post("/login",function(req,res){

	comdb(function(error,db){
    	 const collection = db.collection('admin'),
    	 	   md5sum = crypto.createHash("md5");
    	 const params={
    	 	userName:req.body.userName,
    	 	pass:md5sum.update(req.body.pass).digest("hex")
    	 }

  			//查询数据
		  collection.find(params,{userName:1,hidden:1,pic:1}).limit(1).toArray(function(err, result) {
		    	
		    	if(err){
		    		res.json({code:"4444",rsp:"系统异常！"});
		    	}else{
		    		
		    		if(result.length){
		    			if(result[0].hidden===1){
		    				 res.json({code:"0009",rsp:"您的账号有违规操作，已被网站管理员封号，有什么疑问请联系啊网站管理员!"});
		    			}else{
		    				res.json(result[0]);
		    			}
		    			
		    		}else{
		    		   res.json({code:"0001",rsp:"有户名或密码错误！"});
		    		}
		    	}	
		  });	
    })
})
router.post("/register",function(req,res){

	comdb(function(error,db){
		const admin=db.collection("admin");
		const findData=new Promise((resolve,reject)=>{
			admin.find({userName:req.body.userName},{_id:1}).limit(1).
			toArray(function(error,item){
				if(item[0]){
					reject({code:"0002","rsp":"用户名已存在，请从新输入用户名."})
				}else{
					resolve();
				}
			})
		});
		const insertData=new Promise((resolve,reject)=>{
				const  md5sum = crypto.createHash("md5");
				md5sum.update(req.body.pass);
			admin.insert({
				userName:req.body.userName,
				pic:req.body.pic,
				pass:md5sum.digest("hex"),
				createTime:new Date().getTime(),
				power:1
			},function(error,item){

				if(error){
					reject({code:"0001",rsp:"网路异常，注册失败"});
				}else{
					resolve({code:"0000",rsp:"注册成功!"})
				}

			})

		})
		Promise.all([findData,insertData]).
		then(value=>{res.json(value[1])})
		.catch(reason=>{res.json(reason)});

	})
})
module.exports=router;