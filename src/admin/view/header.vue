<template>
	<header class="main-header">
		<a href="" class="loge">chenfan</a>
	    <div class="navbar">
	        <div class="dropdown">
	              <a id="dLabel" href="">
	                    <img src="../images/user_img.jpg" class="user-image" alt="User Image">
	                           {{userInfo.userName}}
	                   <span class="caret"></span>
	              </a>
	               <ul class="dropdown-menu" id="dropdown-menu">        
	                  <li><a @click.prevent="setPass()" href="">修改密码</a></li>
	                  <li><a @click.prevent="dropOut()" href="">退出</a></li>
	                  <li><router-link to="/index">回到首页</router-link></li>
	              </ul>
	         </div>
	    </div>
	</header>
</template>
<script type="text/javascript">
var  _body=null;
export default{
	data(){
		return {
			userInfo:{}
		}
	},
	beforeCreate(){
		if(!(sessionStorage.getItem("userInfo")&&JSON.parse(sessionStorage.getItem("userInfo")))){
			this.$router.push({"path":"/login"});
		}
	},
	mounted(){
		const _this=this, 
			dropdownMenu= document.getElementById("dropdown-menu");
		
		this.$data.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
		
		document.getElementById("dLabel").onclick=function(event){
			if(dropdownMenu.style.display=='block'){
				dropdownMenu.style.display="none";
			}else{
				dropdownMenu.style.display="block"
			}
			event.preventDefault();
			event.stopPropagation();
		}
		_body=document.documentElement||document.body;
		
		_body.addEventListener("click",_this.dropdownMenuFn,false);
	},
	methods:{
		setPass(){
			this.alertFn({cont:"暂无开放，尽情期待!"});
		},
		dropOut(){
			sessionStorage.removeItem("userInfo");
			this.$router.push({"path":"/login"});
		},
		dropdownMenuFn(){
			document.getElementById("dropdown-menu").style.display="none";
		}
	},
	beforeDestroy(){
		const _this=this;
		_body.removeEventListener("click",_this.dropdownMenuFn)
	}
}		


</script>