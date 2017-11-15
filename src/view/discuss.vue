<template>
	<section v-if="data!==null">
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
					<textarea @focus="focusFn($event)" id="discuss" @keyup="setTextArea($event)" style="height:1.4rem" placeholder="评论"></textarea>
					<button @click="submitFn()" class="submit">提交</button>
				</div>
			</div>	
			<h2>最新评论</h2>
			
			<div class="data-null" v-if="!data.length">
				暂无数据
			</div>
			<div class="comment" v-else v-for="item in data">
				<div class="user_pic">
					<img :src="item.pic||'../images/li_09.png'" />
				</div>
				<div class="main">
					<h3>{{item.userName}}<span v-if="item.replaceUserName"><i> 回复 </i>{{item.replaceUserName}}</span></h3>
					<div class="time">{{dateDiff(item.createTime)}}</div>
					<div class="cont">{{item.cont}}</div>
					<router-link :to="'/index/replaceDiscuss/'+item._id" class="rpl">回复</router-link>
				</div>
			</div>		
		 </article>
	</section>
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
.discuss .comment:first-child{ padding-top:0; }
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
.discuss .comment .main>h3 i{ color: #999 }
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
				index:0,
				maxPage:1,
				flag:true,
				data:null
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
		updated(){
			 const _body=document.documentElement||document.body,
            _this=this;
			window.addEventListener("scroll",_this.scrollFn,false);
		},
		methods:{
			getData(){
				if(!this.$data.flag)return false;
				
				const _this=this;
				_this.$data.flag=false;
				_this.$data.index++;
				const params={
					index:_this.$data.index,
					news_id:_this.$route.params.id
				}
				if(_this.$data.index>_this.$data.maxPage){
					return false;
				}
				
				_this.$ajax({
					method:"post",
					data:params,
					url:"/discuss"
				}).then(function(rep){
					
					if(rep.data.code){
						_this.$data.data={};
					}else{
						if(_this.$data.index==1){
							_this.$data.maxPage=rep.data.maxPage;
							_this.$data.data=rep.data.data;
						}else{
							_this.$data.data=_this.$data.data.concat(...rep.data.data)
						}
						
						setTimeout(function(){_this.$data.flag=true;},5E2)
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
					_this.$router.push({path:"/index/login"});
				}
			},
		
	        scrollFn(){
	            const scrollTop=(document.body||document.documentElement).scrollTop,
	               _this=this,
	                outerHeight=this.$root.$el.scrollHeight,   
	                height=window.innerHeight;
	           if(scrollTop+height+20>outerHeight&&_this.$data.flag){
	               
	               _this.getData()
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
					pic:userInfo.pic,
					userId:userInfo._id,
					news_id:_this.$route.params.id
				}
				
				_this.$ajax({
					method:"post",
					url:"/discussAdd",
					data:params
				}).then(function(req){
					if(req.data.code){
						_this.alertFn({cont:req.data.rsp});
					}else{
						const text=document.getElementById("discuss");
						text.value="";
						text.style.height="1.4rem";
						_this.$data.index=1;
						_this.$data.maxPage=req.data.maxPage;
						_this.$data.data=req.data.data;
					}
				})

			}
		}

	}


</script>