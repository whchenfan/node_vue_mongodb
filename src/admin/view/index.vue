<template>
	
		<!--header end-->
		<div class="main-content clearfix">
			<!--content left begin-->
			<div class="left-menu" id="left-menu">
				<ul>
					<li :class="hasClass('index',path)"><a href="/index.html"><i class="comm-icon home-icon"></i>前置页面<i class="left-icon"></i></a></li>
				</ul>
				 <ul>
            		<li :class="hasClass('user',path)">
						<router-link to="/index/user">
            			<i class="comm-icon use-icon"></i>用户列表<i class="left-icon"></i>
						</router-link>
            		</li>
      		     </ul>
      		     <ul>
            		<li :class="hasClass('newsType',path)">
            			<router-link to="/index/newsType">
            			<i class="comm-icon news-icon"></i>新闻分类<i class="left-icon"></i></router-link>
            		</li>
            		<li :class="hasClass('news',path)">
					  <router-link to="/index/news">
            			<i class="comm-icon news-list-icon"></i>新闻列表<i class="left-icon"></i></router-link>
            		  </li>
      		     </ul>
		     </div>
			<!--content left end-->
			<!--content right begin-->
			<div class="right-menu" id="right-menu">
					<router-view></router-view>
			</div>
			<!--content right end-->
			<!--footer begin-->
			<footer class="footer">
	    		版权所有 © 2017 chenfan个人所有，并保留所有权利。
			</footer>
			<!--footer end-->
		</div>
		
	
</template>
<script>
  export default{
  	data(){
  		return {
  			path:""	
  		}
  	},
  	mounted(){
  	 	const path=[...new Set(this.$route.path.split(/\/([a-z]+)/ig))];
  	 	var _this=this;
  	 	if(path[path.length-1]){
        	 this.$data.path=path[path.length-1];
  	 	}
  	 	[...document.querySelectorAll("#left-menu a")].forEach(function(item){
  	 		item.onclick=function(){
  	 			_this.$data.path=this.getAttribute("href").match(/([a-z]+)$/ig)[0];
  	 		}
  	 	})
  	}
  }
</script>