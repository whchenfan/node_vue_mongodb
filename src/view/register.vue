<template>
	<section class="login">
    	<form action="" method="post">
        	<ul>
            	<li class="pdl1_6">
                	<i class="user_icon"></i>
                    <div class="inp_div">
                    	<input class="inp" placeholder="会员名" type="text" name="userName">
                    </div>
                </li>
                <li class="pdl1_6">
                	<i class="lock_icon"></i>
                    <div class="inp_div rel">
                    	<input class="inp" placeholder="登录密码" type="password" name="pass">
                        <em class="yan_icon"></em>
                    </div>
                </li>
                <li class="pdl1_6">
                	<i class="lock_icon"></i>
                    <div class="inp_div rel">
                    	<input class="inp" placeholder="确认密码" type="password" name="ensurePass">
                        <em class="yan_icon"></em>
                    </div>
                </li>
                <li style="padding-right:5.333rem;">
                    <input class="rel inp dxyzm" placeholder="验证吗" name="code" type="text" />
                    <canvas class="code_img" id="canvas" @click="drawCode('canvas')"></canvas>
                </li>
            </ul>
            <div class="upload_pic">
                <input type="file" @change="changeFn($event)" style="display:none" />
                <button @click.prevent="uploadFn($event)" class="upload">上传图片</button>
                <div class="upload_img" v-if="imgsrc!=null">
                    <img :src="imgsrc" />
                </div>
            </div>
            <p class="tip">温馨提示：您上传的图片高度必须大于90，并且最好是正方形的图片，否则我们将按照一定比例缩小裁剪为正方形的图片!</p>
            <div class="pdlr1 pdt1">
            	<button type="button" class="btn_login" @click="submitFn()">注册</button>
            </div>
            <footer class="clearfix">
            	<router-link to="/index/login" class="fl">登录</router-link>
                <router-link to="/index/login" class="fr">忘记密码</router-link>
            </footer>
        </form>
    </section>   
</template>
<style> 
    @import "../css/login.css"; 
    .upload_pic{ display: flex; padding-top: .5rem; }
    .upload_pic .upload{
        display: block;
        font-size: .8rem;
        color: #fff;
        background-color: #448aff;
        border: 0 none;
        padding: .5rem .8rem;
        margin-left: .4rem;
        -webkit-border-radius: .3rem;
        border-radius: .3rem;
    }
    .upload_pic .upload_img{ display: block; flex:1; -webkit-flex:1; line-height: 0;}
    .upload_pic .upload_img>img{ padding-left: 1rem; width:3rem; height: 3rem;  }
    .tip{ background: #eee;
    font-size: .8rem;
    padding: .4rem .9rem; margin-top:.4rem;}
</style>
<script>
export default{
    data(){
        return {imgsrc:null}
    },
    mounted(){
        this.drawCode('canvas');
    },
    methods:{
        submitFn(){
            const _this=this,
                  ensurePass=document.querySelector('input[name="ensurePass"]'),
                  code=document.querySelector('input[name="code"]'),
                  userName=document.querySelector('input[name="userName"]'),
                  pass=document.querySelector('input[name="pass"]');
           if(!userName.value.trim()){
                _this.alertFn({"cont":"用户名不能为空!",fn:function(){
                   userName.focus(); 
                }})
                return false;
           }
           if(!pass.value.trim()){
                _this.alertFn({"cont":"密码不能为空!",fn:function(){
                   pass.focus(); 
                }})
                return false;
           }
           if(!ensurePass.value.trim()){
                _this.alertFn({"cont":"确认密码不能为空!",fn:function(){
                   ensurePass.focus(); 
                }})
                return false;
           }
           if(ensurePass.value.trim()!=pass.value.trim()){
               _this.alertFn({"cont":"两次密码不相同!",fn:function(){
                   ensurePass.focus(); 
                }})
                return false;
           }
           if(!code.value.trim()){
                _this.alertFn({"cont":"请输入验证码!",fn:function(){
                   _this.drawCode('canvas');
                   code.focus(); 
                }})
                return false;
           }
            if(code.value.trim().toUpperCase()!=this.code){
                _this.alertFn({"cont":"验证码有误请从新输入!",fn:function(){
                  _this.drawCode('canvas');
                   code.focus(); 
                }})
                return false;
           }
           _this.$ajax({
                method:"post",
                url:"/register",
                data:{userName:userName.value,pass:pass.value,pic:_this.$data.imgsrc}
           }).then(function(req){
               _this.alertFn({cont:req.data.rsp,fn:function(){
                    if(req.data.code=="0000"){
                        _this.$router.push({path:"/index/login"})
                    }
               }})
           })

        },
        uploadFn($event){
            const obj=$event.target,
                  file=obj.previousElementSibling;
           file.click();
        },
        changeFn($event){
            const obj=$event.target,
                  _this=this,
                  imageType=['image/png','image/jpeg','image/gif'],
                  height=90,
                  width=90,
                  file=obj.files[0];
            if(imageType.indexOf(file.type)==-1){
               _this.alertFn({cont:"上传文件格式有问题，请从新输入!"});
               return false; 
            }
            var _URL = window.URL || window.webkitURL;
            const img=new Image();
            img.src=_URL.createObjectURL(file);
         
            img.onload=function(){
               
                if(this.width<width||this.height<height){
                    _this.alertFn({cont:"上传图片高或宽太小不符合上传图片的规则!"});
                     return false; 
                }
                 const canvas=document.createElement("canvas"),
                    txt=canvas.getContext("2d"),
                    scaleW=width/this.width,
                     scaleH=height/this.height;
                if(scaleW<=scaleH){
                  const  w=this.width*scaleH;
                         canvas.width=w;
                         canvas.height=height;
                         txt.fillStyle="#fff";
                         txt.fillRect(0,0,w,height);
                         txt.drawImage(this,0,0,w,height);
               
                  const imgData=txt.getImageData((w-height)/2,0,height,height),
                    canvas1=document.createElement("canvas"),
                        txt1=canvas1.getContext("2d");
                         canvas1.height=height;
                         canvas1.width=width;
                  
                txt1.putImageData(imgData,0,0);
              
                    _this.$data.imgsrc=canvas1.toDataURL();
                return false;
            }
            const h=this.height*scaleW;
                canvas.width=width;
                canvas.height=h;
                txt.fillStyle="#fff";
                txt.fillRect(0,0,width,h);
                txt.drawImage(this,0,0,width,h);
                const imgData=txt.getImageData(0,(h-width)/2,width,width),
                    canvas1=document.createElement("canvas"),
                    txt1=canvas1.getContext("2d");
                canvas1.height=width;
                canvas1.width=width;
                
                txt1.putImageData(imgData,0,0);
               
           _this.$data.imgsrc=canvas1.toDataURL();
        }
     }   
    }
}
</script>
