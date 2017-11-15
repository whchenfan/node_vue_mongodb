# node_vue_mongodb
# 前言
	以前在网上找了很多node+vue+mongodb的项目，可以下载下来，不是这里有问题就是哪里又问，于是决定自己搭建一个这个项目，所以才有了这个项目。本来六个月前就应该做出来的，可是由于老婆生孩子了，所以一直当误了，直到今天才将它完成。

# 技术栈
	vue2+vue-router+vue-router + webpack + ES6 + axios + node + mongoDB
	
# 项目运行
&nbsp;&nbsp;温馨提示:要运行该项目，你电脑上首先必须要安装node+mongodb数据库才能<br />	
&nbsp;&nbsp;首先&nbsp;&nbsp;git clone https://github.com/whchenfan/node_vue_mongodb.git 将项目下载到本机<br />
&nbsp;&nbsp;再用控制台进入项目目录<br />
&nbsp;&nbsp; npm install //安装所有项目需要的包<br />
&nbsp;&nbsp;npm run build //打包文件<br />
&nbsp;&nbsp;npm run dev //启动服务器 <br />
&nbsp;&nbsp;浏览器地址中输输入:localhost:8000 <br />

#  项目布局
├── doc&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// 文档说明   <br />
├── server&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// 文档说明   <br />
│&nbsp;&nbsp;├── router<br />
│&nbsp;&nbsp;│&nbsp;&nbsp;├── admin&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//后台数据接口文件<br />
│&nbsp;&nbsp;│&nbsp;&nbsp;├── *.js&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//前台数据接口文件<br />
│&nbsp;&nbsp;├── app.js&nbsp;&nbsp;&nbsp;&nbsp;//启动服务器文件<br />
│&nbsp;&nbsp;├── mongoDB.js&nbsp;&nbsp;&nbsp;&nbsp;//链接mongodb数据库<br />
├── src                                          // 静态资源 <br />
│&nbsp;&nbsp;├── admin                                    // 后台文件<br />
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├──css                               // 后台css文件<br />
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── images                           // 后台mages文件<br />
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── js                               // 后台js文件<br />
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── ueditor                          // 百度编辑器<br />
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── view                             // 后台视图文件<br />
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├──  index.html                      // 后台入口<br />
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├──  index.js <br />
│&nbsp;&nbsp;├── css                                      // 前台css文件<br />
│&nbsp;&nbsp;├── images                              	 // 前台images文件<br />
│&nbsp;&nbsp;├── js                               	 // 前台js文件<br />
│&nbsp;&nbsp;├── view                                     // 前台视图文件<br />
│&nbsp;&nbsp;├── index.html                        	 // 前台入口文件<br />
│&nbsp;&nbsp;├── index.js<br />
│&nbsp;&nbsp;├── favicon.ico                               // 图标<br />

#  目标功能
<h3>前台功能</h3>
&nbsp;&nbsp;&nbsp;&nbsp;用户注册：<br />
&nbsp;&nbsp;&nbsp;&nbsp;用户登录：<br />
&nbsp;&nbsp;&nbsp;&nbsp;查看新闻:<br />
&nbsp;&nbsp;&nbsp;&nbsp;用户发表评论<br />
<h3>后台功能</h3>
&nbsp;&nbsp;&nbsp;&nbsp;管理员登录：这里后台做了一个判断，只有有管理员权限的用户才能进入后台<br />
&nbsp;&nbsp;&nbsp;&nbsp;发表新闻:修改新闻，是否让新闻显示在前台页面<br />
&nbsp;&nbsp;&nbsp;&nbsp;修改用户权限，不让用户登录（其实就是相当你发了一些违法的消息或者广告，管理员就不让你在登录）。<br />


