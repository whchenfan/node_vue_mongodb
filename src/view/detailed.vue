<template>
	<section v-if="data!=null">
		<header class="comm-header">
			<div>
				<h1>
					<a href="javascript:;" class="back"><i></i></a>
			         <span class="qun">全站搜索</span>
			         <span class="all"><i></i></span>
				</h1>
			</div>
		</header>
		<div class="news_del">
	            <h1 class="title"><span>{{data.title}}</span></h1>
	           	<div class="time"><i class="icon_time"></i>{{formatTime(data.createTime)}}</div>
	            <div class="cont" v-html="data.content"></div>
	            <a style="pading-top:.4rem;" v-if="data.source" :href="data.sourceAddress||'javascript:;'" target="_blank">来源：{{data.source}}</a>  
	    </div>
		<router-view></router-view>
		<footer class="det_footer">
			<ul class="clearfix">
				<li><router-link :to="'/index/discuss/'+data._id" class="wpl">评论</router-link></li>
				<li><router-link :to="'/index/discuss/'+data._id" class="rpl">{{data.count}}</router-link></li>
				<li><a href="javascript:;" class="shareBtn">分享</a></li>
			</ul>
		</footer>
		<div class="share_cont">
			<article>
				<a @click.prevent="shareFn()" href=""></a>
				<a @click.prevent="shareFn()" href=""></a>
				<a @click.prevent="shareFn()" href=""></a>
				<a @click.prevent="shareFn()" href=""></a>
				<a @click.prevent="shareFn()" href=""></a>
			</article>
			<button class="closeBtn">取消</button>
		</div>
	</section>
</template>
<style>
.hidden_x{ overflow-x:hidden;}
.news_del{ padding:.4rem .8rem 2rem; line-height:1.6; font-size:.8rem; text-align:justify; text-justify:inter-ideograph;}
.news_del .title{ font-size:.9rem; line-height:1.4; padding:.4rem 0; text-align:center;}
.news_del .title span{ display:inline-block; text-align:left;}
.news_del .time .icon_time{ position:relative; top:-2px; display:inline-block; height:.8rem; width:.8rem; padding-left:.3rem; background:url(../images/icon_t.png) no-repeat left center; background-size:.8rem; vertical-align:middle}
.news_del .time{ padding-bottom:.4rem; color:#1173ee; font-family:Arial; }
.news_all{ width: 100%; background: #f9f9f9; transform:translateX(100%); position:fixed; top:3rem; left:0; z-index:10; padding:.3rem; height:100%; display: none;}
.hidden_x .news_all{ display: block;transition:transform 1s linear; -webkit-transition:-webkit-transform 1s linear; }
.news_all li{ width:25%; box-sizing:border-box; -webkit-box-sizing:border-box; padding:.3rem; float:left;}
.news_all li a{ font-size:.8rem; border-radius:.2rem; border:1px solid #ccc; text-align:center; line-height:1.4rem; height:1.4rem; background:#FFF;}
.app .news_all{ transform:translateX(0); }
.app .comm-header .qun{ opacity:1; transition:opacity 1s linear;}
.det_footer{ position: fixed; bottom:0; left:0; width:100%; background:#FFF; border-top:1px solid #ccc; }
.det_footer li{ float:left; width: 33%; text-align:center;}
.det_footer li:nth-child(2){ width: 34%; border-left:1px solid #ccc; border-right:1px solid #ccc; box-sizing:border-box; }
.det_footer li>a{ font-size:.8rem; line-height: 1.8rem; height: 1.6rem; }
.det_footer li>a.wpl:before{ content:""; margin-right:.4rem; height: 1rem; width: 1rem; background: url(../images/e_icon.png) no-repeat left center; background-size:contain;     vertical-align: sub;display: inline-block;
    }
.det_footer li>a.rpl:before{ content:""; margin-right:.4rem; height: 1rem; width: 1rem; background: url(../images/e_icon_01.png) no-repeat left center; background-size:contain;    vertical-align: sub;
     display: inline-block; }
.det_footer li>a.shareBtn:before{ content:""; margin-right:.4rem; height: 1rem; width: 1rem; background: url(../images/e_icon_02.png) no-repeat left center; background-size:contain;     vertical-align: sub; display: inline-block;
    }
.share_cont{transition:transform 1s linear; position: fixed; z-index: 51; bottom:0;left:0; width: 100%;background:#fff; transform: translateY(100%); -webkit-transform:translateY(100%);  will-change: transform; }
.share_cont article{ display: flex; display: -webkit-flex; padding:0 .5rem; border-top:1 solid #ccc; border-bottom:1px solid #ccc;}   
.share_cont article a{ flex:1; -webkit-flex:1; padding:.5rem
}
.share_cont article a:before{ content: " ";  height:50px; width: 50px; background:url(../images/shareicons_temp.png) no-repeat left center; background-size:auto 50px; display:inline-block; text-align:center; }
.share_cont article a:nth-child(2):before{ background-position:-50px 0; }
.share_cont article a:nth-child(3):before{ background-position:-100px 0; }
.share_cont article a:nth-child(4):before{ background-position:-148px 0; }
.share_cont article a:nth-child(5):before{ background-position:-198px 0; }
.share_cont .closeBtn{ line-height: 2rem; text-align: center; color: #333; width: 100%; background:transparent; }
.share_cont.show{ transform:translateY(0); -webkit-transform:translateY(0); }
</style>
<script type="text/javascript">
	 export default{
		data(){
			return{
			   
			   data:null,
			   headerFlg:false
			}
		},
	    beforeMount(){
	    	const _this=this;
    		_this.$ajax({
    			method:"post",
    			url:"/newsDetailed",
    			data:{"id":_this.$route.params.id}
    		}).then(function(res){
    			if(res.data.code){
    				_this.$data.data={};
    			}else{
    				_this.$data.data=res.data.Detailed;
    			}
    			
    		});
	    },
	    methods:{
	    	shareFn(){
	    		document.querySelector(".share_cont").className="share_cont";
	    		this.alertFn({"cont":"暂无开放，尽情期待！"})
	    	}
	    },
	    beforeDetroy(){
	    	_this.$root.$el.className="";
	    }
	}


</script>