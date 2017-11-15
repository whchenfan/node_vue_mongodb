<template>
	<div class="news_all">
    	<ul class="clearfix">
        	<li><router-link to="/index">首页</router-link></li>
        	<li v-for="item in data">
				<router-link :to="'/index/news/'+item._id">{{item.title_type.replace("新闻","")}}</router-link>
        	</li>
        </ul>
    </div>
</template>
<script>	
	export default{
		data(){
			return {
				data:{},
				flg:true
			}
		},

		beforeMount(){
			const _this=this;
		
			_this.$ajax({
				method:"post",
				url:"/newsType"
			}).then(function(res){
				
				_this.$data.data=res.data;
			})
		},
		updated(){
			
			const _this=this;
			this.$root.$el.className="hidden_x";
			
			document.querySelector(".all").onclick=function(){
				if(!_this.$data.flg)return false;
				_this.$data.flg=false;
				if(_this.$root.$el.className.includes("app")){
					_this.$root.$el.className=_this.$root.$el.className.replace("app");
				}else{
					_this.$root.$el.className+=" app";
				}
				
				setTimeout(function(){_this.$data.flg=true},1E3);
			}
			document.querySelector(".back").addEventListener("click",_this.backFn,false);
		
			document.querySelector(".shareBtn").addEventListener("click",_this.shareFn,false);
			document.querySelector("button.closeBtn").addEventListener("click",_this.hiddenShare,false);
		},
		methods:{
			backFn(){
				const _this=this;
				if(!_this.$data.flg)return false;
				if(_this.$root.$el.className.includes("app")){
					
					_this.$root.$el.className="hidden_x";
				}else{
					_this.$router.go(-1);
				}
				setTimeout(function(){_this.$data.flg=true},1E3);
			},
			shareFn(){
				const _this=this;
				if(!_this.$data.flg)return false;
				_this.$data.flg=true;
				var mask=document.querySelector(".mask");
				
				if(!mask){
					mask=document.createElement("div");
					mask.className="mask";
					_this.$root.$el.appendChild(mask);
				}else{
					mask.style.display="block";
				}
				document.querySelector(".share_cont").className+=" show";
				setTimeout(function(){_this.$data.flg=true;},1E3)
			},
			hiddenShare(){
				const _this=this;
				console.log(_this.$data.flg);
				if(!_this.$data.flg)return false;
				_this.$data.flg=true;
				
				document.querySelector(".mask").style.display="none";
				document.querySelector(".share_cont").className=document.querySelector(".share_cont").className.replace(" show","");
				setTimeout(function(){_this.$data.flg=true;},1E3)

			}

		},
		beforeDetroy(){

			
			document.querySelector(".back").removeEventListener("click",this.backFn);
			document.querySelector(".shareBtn").removeEventListener(this.shareFn);
			document.querySelector("button.closeBtn").removeEventListener("click",_this.hiddenShare);
		},
		destroyed(){
			this.$root.$el.className="";
		}

	}

</script>
