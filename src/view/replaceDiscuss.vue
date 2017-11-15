<template>
	<div v-if="data!==null">
		<header class="comm-header header_rel">
		    	<div class="div">
		    		<h1 v-if="userInfo==null">
    			<a href="javascript:history.back();" class="back"><i></i></a>评论<router-link to="/index/login" class="user_icon"><img src="../images/li_09.png" /></router-link>
    			</h1>
	    		<h1 v-else>
	    			<a href="javascript:history.back();" class="back"><i></i></a>评论<router-link to="/index/login" class="user_icon"><img :src="userInfo.pic||'../images/li_09.png'" /></router-link>
	    		</h1>
		    	</div>	
	   	</header>
	   	<article class="discuss">
			<div class="ping">
				<div></div>
				<div>
					<textarea @focus="focusFn($event)" id="discuss" @keyup="setTextArea($event)" style="height:1.4rem" :placeholder="'回复 '+data.userName"></textarea>
					<button @click="submitFn()" class="submit">提交</button>
				</div>
			</div>	
		
				<div class="data-null" v-if="!data._id">
					暂无数据
				</div>
				<div v-else>
					<div class="comment">
						<div class="user_pic">
							<img :src="data.pic||'../images/li_09.png'" />
						</div>
						<div class="main">
							<h3>{{data.userName}}</h3>
							<div class="time">{{dateDiff(data.createTime)}}</div>
							<div class="cont">{{data.cont}}</div>
						</div>
					</div>
					<div class="comment"  v-for="item in listData">
						<div class="user_pic">
							<img :src="item.pic||'../images/li_09.png'" />
						</div>
						<div class="main">
							<h3>{{item.userName}}</h3>
							<div class="time">{{dateDiff(item.createTime)}}</div>
							<div class="cont">{{item.cont}}</div>
						</div>
					</div>	
				</div>
		
			
			
		 </article>
	</div>
</template>
<style>
.header_rel>div{position:relative;}
.discuss .ping>div:nth-of-type(1){ padding:0; }
.discuss .ping>div{ padding:.4rem .8rem;display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    background-color: #f7f7f7; }
 .discuss .ping>div textarea{display: block;
    width: 0%; -webkit-box-flex: 1; -webkit-flex: 1;
    -ms-flex: 1; flex: 1; padding:.3rem .5rem;
    font-size:.8rem;line-height:1.4rem;
    border: 1px solid #d5dde6; outline: none;
    -webkit-overflow-scrolling: touch;-webkit-appearance: none; border-radius: .3rem;}
 .discuss .ping>div .submit{display: block; font-size:.8rem;
    color: #fff;background-color: #448aff; border: 0 none; padding: 0 .8rem; margin-left:.4rem; -webkit-border-radius: .3rem;border-radius:.3rem;}
 .discuss h2{ font-size:.9rem; line-height: 2; padding:.5rem .8rem; }  
 .discuss>h2{ font-weight: bold; }  
.discuss .comment{ display: flex; display: -webkit-flex; padding:.5rem .8rem 0; }
.discuss .comment:first-child{ padding-top:.8rem; }
.discuss .comment .user_pic{ height: 2rem; width:2rem; padding-right: .8rem; }
.discuss .comment .user_pic>img{ height: 2rem; width:2rem;border-radius: 50%; -webkit-border-radius:50%;}

.discuss .comment .main{ border-bottom: 1px solid #ccc; flex: 1; -webkit-flex:1; position:relative; }
.discuss .comment .main .rpl{font-size: .8rem;
    line-height: 1.8rem; height: 1.6rem; position: absolute; top: .1rem; right:0; padding-left:.5rem;}
.discuss .comment .main .rpl:before{content: "";
    margin-right: .4rem; height: 1rem; width: 1rem;
    background: url(../images/e_icon_01.png) no-repeat left center;
    background-size: contain;vertical-align: sub; display: inline-block;}
.discuss .comment .main>h3{ line-height: 1.4; font-size:.8rem; }
.discuss .comment .main>.time{ position:relative; line-height: 1.2; font-size:.7rem; padding-left:.8rem; color: #ccc;}
.discuss .comment .main>.time:before{
	content:""; position:absolute; left: 0; top:50%; margin-top:-.3rem;
	display:inline-block; width: .6rem; height: .6rem;
	background:url(../images/icon_t.png) no-repeat center center;
	background-size:100%;
}
.discuss .comment .main>.cont{ font-size:.8rem; line-height: 1.4; padding: .4rem 0; }

</style>
<script type="text/javascript">
	export default{
		data(){
			return {
				userInfo:null,
				data:null,
				listData:null
			}
		},
		created(){
			if(sessionStorage.getItem("userInfo")!==null){
			this.$data.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
			}
		},
		beforeMount(){
			this.getData();
		},
		methods:{
			getData(){
				const _this=this;
				
				_this.$ajax({
					method:"post",
					data:{id:_this.$route.params.id},
					url:"/replaceDiscuss"
				}).then(function(rep){
					
					if(rep.data.code){
						_this.$data.data={};
					}else{
						_this.$data.data=rep.data.data;
						_this.$data.listData=rep.data.listData;
					}
				})

			},
			setTextArea($event){
			   const obj=$event.target;
			   if(obj.scrollTop!=0){
			   	 obj.style.height=(obj.scrollTop+obj.offsetHeight)+"px";
			   }
			},
			focusFn($event){
				const _this=this;
				
				if(sessionStorage.userInfo==undefined){
					_this.$router.push({path:"/index/login"})
				}
			},
			submitFn(){
				const _this=this;
				
				const discuss=document.getElementById("discuss")
				const textValue=discuss.value.trim();
				if(!textValue){
					discuss.focus();
					return false;
				}
				const userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
				const params={
					cont:textValue,
					userName:userInfo.userName,
					userId:userInfo._id,
					pic:userInfo.pic,
					id:_this.$route.params.id
				}
				_this.$ajax({
					method:"post",
					url:"/replaceAdd",
					data:params
				}).then(function(req){
					
					
						_this.alertFn({cont:req.data.rsp,fn:function(){
							if(req.data.code=="0000"){
								const text=document.getElementById("discuss");
						text.value="";
						text.style.height="1.4rem";
						_this.getData();
							}
						}});
					
				})

			}
		}

	}


</script>