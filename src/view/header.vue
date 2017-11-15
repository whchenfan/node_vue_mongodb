<template>
	<header class="comm-header">
    	<div class="div">
    		<h1 v-if="userInfo==null">
    			<a href="javascript:history.back();" class="back"><i></i></a>新闻系统<router-link to="/index/login" class="user_icon"><img src="../images/li_09.png" /></router-link>
    		</h1>
    		<h1 v-else>
    			<a href="javascript:history.back();" class="back"><i></i></a>新闻系统<router-link to="/index/login" class="user_icon"><img :src="userInfo.pic||'../images/li_09.png'" /></router-link>
    		</h1>
    	</div>	
    </header>
</template>
<script>
export default{

	data(){
		return {
			userInfo:null,
			
		}
	},

	created(){
	   
		if(sessionStorage.getItem("userInfo")!==null){
			this.$data.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
		}
	},
	methods:{
		backLogin(){
			sessionStorage.removeItem("userInfo");
			this.$data.userInfo={};
			this.alertFn({cont:"退出成功！"});
		}

	}

}


</script>