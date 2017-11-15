const express = require('express');
const router = express.Router();



router.get('/', function(req, res) {

	res.send("发送成功");
});
router.get('/index', function(req, res) {
	res.send("发送成功");
});
// 定义 about 页面的路由
router.post('/index', function(req, res) {
  res.send('About birds');
});

module.exports = router;