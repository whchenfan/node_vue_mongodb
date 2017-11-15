const express=require("express");
const router=express.Router();
const comdb=require("../mongoDB");
// 定义网站主页的路由
router.get('/about', function(req, res) {

	comdb(function(error,db){
    	 var collection = db.collection('admin');
  			//查询数据
		  collection.find().sort({_id:-1}).toArray(function(err, result) {
		    
		    res.json(result);
		  });
    	
    })
});


// 定义 about 页面的路由
router.post('/about', function(req, res) {
    comdb(function(error,db){
       var collection = db.collection('admin');
        //查询数据
      collection.find().sort({_id:-1}).toArray(function(err, result) {
        
        res.json(result);
      });
      
    })
});

module.exports=router;