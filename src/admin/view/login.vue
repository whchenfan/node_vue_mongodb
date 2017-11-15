<template>
	
	<div class="login">
    	<form>
		  <ul>  
		   
		   <li class="inpLi">
		  		<span>用户名：</span>
		   		<input type="text" :value="user_name" name="user_name" class="inpLogin">
		   	</li>
		   <li class="inpLi">
		   		<span>密码：</span>
		   		<input type="password" :value="pass" name="password" class="inpLogin">
		   	</li>
		   	<li class="clearfix">
				<em class="fr"><canvas @click="drawCode('codeCanvas')" id="codeCanvas"></canvas></em>
				<input type="text" name="code" class="captcha" />
		   	</li>
		   <li class="f_c">
		   		<input type="button" name="submit" class="btn btn-blue" @click="loginFn()" value="登录" /> 
		   		<input type="reset" name="reset" class="btn btn-red" value="重置" />
		    </li> 
		  </ul>
		</form>
    </div>
</template>
<script  type="text/javascript">
export default{
	data(){
		return {
			user_name:"chenfan",
			pass:"chenfan"
		}
	},
	mounted(){

		
		this.drawCode("codeCanvas");
	},
	methods:{
		loginFn:function(){
			const _this=this,
				user_name=document.querySelector('input[name="user_name"]').value,
				code=document.querySelector('input[name="code"]').value,
				pass=document.querySelector('input[name="password"]').value;
			if(!code){
				_this.alertFn({cont:"验证码不能为空!",fn:function(){_this.drawCode("codeCanvas")}});
				return false;
			}else if(code.toUpperCase()!=_this.code){
				_this.alertFn({cont:"验证码有误!",fn:function(){_this.drawCode("codeCanvas")}});
				return false;
			}

			if(user_name&&pass){
				this.$ajax({
					url:"/admin/adminLogin",
					method:"post",
					data:{user_name:user_name,pass:pass}
				}).then(function(response){
					if(!response.data.code){
						sessionStorage.setItem("userInfo",JSON.stringify(response.data[0]));
						_this.$router.push({path:"index"});
					}else{
						_this.alertFn({cont:response.data.rsp});
						
					}
					
				})
			}
		}

	}

}
</script>