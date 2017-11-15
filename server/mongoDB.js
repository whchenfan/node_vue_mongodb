//引入mongodb模块，获得客户端对象
const MongoClient = require('mongodb').MongoClient;
//连接字符串
const DB_URL = 'mongodb://localhost:27017/newsCmr';

const db=function(fn){
	return MongoClient.connect(DB_URL,fn);
}
module.exports=db;


