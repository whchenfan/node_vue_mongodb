<template>
    
	<div class="login">
    	    <ul>
                <li class="pdl1_6">
                    <i class="user_icon"></i>
                    <div class="inp_div">
                        <input class="inp" placeholder="会员名" name="userName" type="text" />
                    </div>
                </li>
                <li class="pdl1_6">
                    <i class="lock_icon"></i>
                    <div class="inp_div rel">
                        <input class="inp" placeholder="登录密码" name="pass" type="password" />
                        <em class="yan_icon"></em>
                    </div>
                </li>
                <li style="padding-right:5.333rem;">
                    <input class="rel inp dxyzm" placeholder="验证吗" name="code" type="text" />
                    <canvas class="code_img" id="canvas" @click="drawCode('canvas')"></canvas>
                </li>
            </ul>
            <div class="pdlr1 pdt1">
                <button type="button" @click="loginFn()" class="btn_login">登录</button>
            </div>
            <footer class="clearfix">
                <router-link to="/index/register" class="fl">注册</router-link>
                <router-link to="/index/login" class="fr">忘记密码</router-link>
                
            </footer>
    </div>

</template>
<style> 
    @import "../css/login.css";
</style>
<script>
export default{
    mounted(){
        this.drawCode("canvas");
    },
    methods:{
        loginFn(){
            const  _this=this,
                userName=document.querySelector("input.inp[name='userName']"),
                pass=document.querySelector("input.inp[name='pass']"),
                code=document.querySelector("input.inp[name='code']");
            let params={};
            if(userName.value.trim()){
                params["userName"]=userName.value.trim();
            }else{
                this.alertFn({"cont":"请输入用户名!",fn:function(){
                    userName.focus();
                    }
                })
                return false;
            }

            if(pass.value.trim()){
                params["pass"]=pass.value.trim();
            }else{
                this.alertFn({"cont":"请输入密码!",fn:function(){
                    pass.focus();
                  }
                })
                return false;
            }
            if(!code.value.trim()){
                this.alertFn({"cont":"请输入验证码!",fn:function(){
                    code.focus();
                    }
                });
                return false;
            }else if(code.value.trim().toUpperCase()!=this.code){
                this.alertFn({"cont":"验证不输入错误!"});
                return false;
            }
            this.$ajax({
                url:"/login",
                method:"post",
                data:params
            }).then(function(response){
                console.log(response.data);
                if(response.data.code){
                    _this.alertFn({"cont":response.data.rsp});
                }else{
                    sessionStorage.setItem("userInfo",JSON.stringify(response.data));
                    _this.$router.push({ path: '/index'});
                }
            })

        }

    }
}
</script>