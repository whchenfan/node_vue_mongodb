const express=require("express");
const router=express.Router();
const crypto = require('crypto');
const comdb=require("../../mongoDB.js");
const mongoose=require("mongoose");
const fs = require('fs');
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  	//上传图片的路劲
    cb(null, 'src/images/uploade')
  },
  filename: function (req, file, cb) {
 	
 	const imgType=['image/jpeg','image/png','image/gif'];
 	if(imgType.indexOf(file.mimetype)==-1){
 		cb(new Error('{code:"1111",rsp:"上传文件格式不对！"}'));
 	}else{
 		
 		var fileFormat = (file.originalname).split(".");
         cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
 	}
  }
})
var upload = multer({storage:storage}).single('file');

router.post('/admin/uploadeFile',function(req, res) {
	upload(req, res,function(error){
		if(!req.file){
			res.json({code:"1111",rsp:"上传图片失败"});
		}else{
			const file =req.file;
			
			res.json({size:req.size,src:file.path.replace(/^src/i,"")});
		}
	})
	
});


/*
 	用户数据表结构
 	userName:用户名称
 	pass:用户密码
 	emailIphone:注册时用到的手机号码或邮箱地址
 	loginTime:最后一次登录时间
 	createTime:用户注册时间
 	power:权限
 */

//用户登录
router.post('/admin/adminLogin',function(req, res){
   comdb(function(error,db){
  	 const collection = db.collection('admin'),
  	        md5sum = crypto.createHash("md5");
			md5sum.update(req.body.pass);
	 const data={
	 		userName:req.body.user_name,
	 		pass:md5sum.digest("hex")
	 	}
	 collection.find(data).limit(1).toArray(function(error,item){
	 	if(!error&&item.length){
	 		//修改用户登录的时间
	 		collection.update(data,{$set:{loginTime:(new Date).getTime()}},function(err, result){
	 			if(item[0].power==2){
	 				res.json(item);
	 			}else if(item[0].hidden==1){
	 				res.json({code:"2223",rsp:"您的账号已被封，如需解封请联系管理员！"});
	 			}else{
	 				res.json({code:"2222",rsp:"您的权限不足！"});
	 			}
	 			
	 		})
	 	}else{
			res.json({code:"1111",rsp:"用户名或密码错误！"});		
	 	}
	 })
   })
})
//获取所有用户信息
router.post('/admin/adminInfo',function(req, res){
	var params={};
	comdb(function(error,db){
		const admin = db.collection('admin'),
			  page=15,
			  index=parseInt(req.body.index)||1;
	    if(req.body.seach!=="")params["userName"]=new RegExp(req.body.seach.trim());
	    if(req.body.hidden!==3)params["hidden"]=parseInt(req.body.hidden);
	    const count=new Promise((resolve,reject)=>{
	    	 admin.find(params,{_id:1}).count(function(error,countNum){
	    	 		if(error){
	    	 			reject({cont:"0001",rsp:"查询数据条件有误!"});
	    	 		}else{
	    	 			resolve(countNum);
	    	 		}
	    	 });
	    });
	    const list=new Promise((resolve,reject)=>{
	    	admin.find(params).sort({createTime:-1}).limit(page).skip((index-1)*page)
	    	.toArray(function(err, item) {
	           if(err){
	                reject({"code":"1111",rsp:"查询语句有问题！"})
	           }else{ 
	              	resolve(item); 
	           }
			})
	    });
	    Promise.all([count,list]).then(value=>{
	    	res.json({list:value[1],maxPage:Math.ceil(value[0]/page)}); 
	    }).catch(reason=>{
	    	res.json(reason);
	    })
	});

})


router.post('/admin/adminAdd', function(req, res) {
	const md5sum = crypto.createHash("md5");
	md5sum.update(req.body.pass);
	const data={
		userName:req.body.userName,
		pass:md5sum.digest("hex"),
		createTime:(new Date).getTime(),
		emailIphone:req.body.emailIphone
	}
	comdb(function(error,db){
    	 var collection = db.collection('admin');
  			//查询数据
  		collection.insert(data, function(err, result) {
    		if(err){
    			res.json({rsp:"添加数据失败"});
    		}else{
    			res.json({rsp:"添加数据成功"});
    		}
    	 })
    })
});
//是否封号
router.post("/admin/adminShowHide",function(req,res){
	
	const id=mongoose.Types.ObjectId(req.body.id),
		  hidden=parseInt(req.body.hidden)?0:1;

	comdb(function(error,db){
		 db.collection("admin").update({_id:id},{$set:{hidden}},function(error,item){
		 		if(error||!item){
		 			res.json({code:"0001",rsp:"修改数据失败!"});
		 			return false;
		 		}
		 		res.json({rsp:"修改数据成功!"});

		 })
	})

})
router.post("/admin/getAdmin",function(req,res){
	comdb(function(error,db){
	
		const admin=db.collection("admin"),
		     id=mongoose.Types.ObjectId(req.body.id);
		admin.find({_id:id}).limit(1).toArray(function(error,item){
				if(error||!item.length){
					res.json([]);
				}else{
					res.json(item[0]);
				}
		})     
	})
})

//修改个人信息
router.post("/admin/updateAdmin",function(req,res){
	comdb(function(error,db){
		
		const admin=db.collection("admin"),
		     id=mongoose.Types.ObjectId(req.body.id),
		     params={
		     	hidden:parseInt(req.body.hidden),
		     	power:parseInt(req.body.power)
		     };
		     console.log(params);
		admin.update({_id:id},{$set:params},function(error,item){
			
			if(item){
				res.json({code:"0000",rsp:"修改数据成功！"});
			}else{
				res.json({code:"0000",rsp:"修改数据失败！"});
			}
		})	 
	})
})
module.exports=router;