<template>    
    <div class="index">
            <div id="banner" v-if="banner&&banner.length" class="banner" >
                <ul >
                    <li v-for="item in banner">
                        <router-link :to="'/index/detailed/'+item._id">
                            <img :src="item.pic[0]" />
                            <span>{{item.title}}</span>
                        </router-link>
                     </li>
                   
                </ul>
            </div>
            <div class="news" v-if="news&&news.length">
              <router-link v-for="item in news" :to="'/index/detailed/'+item._id" >
                <dl v-if="item.pic==''||item.pic==undefined">
                    <dt><h2>{{item.title}}</h2></dt>
                    <dd>
                        <p>{{getText(item.content||"")}}</p>
                        <div class="end"><i class="icon_time"></i>{{formatTime(item.createTime)}}</div>
                    </dd>
                </dl>
                <dl v-else-if="item.pic.length<3">
                    <dt class="clearfix">
                       <div class="images_one">
                            <div class="image_item">
                                <div class="pic">
                                     <img :src="item.pic[0]" />
                                </div>
                            </div>
                        </div>
                        <h2>{{item.title}}</h2></dt>
                    <dd>

                        <p>{{getText(item.content||"")}}</p>
                        <div class="end"><i class="icon_time"></i>{{formatTime(item.createTime)}}</div>
                    </dd>
                </dl>
                <dl v-else>
                    <dt>
                        <h2>{{item.title}}</h2>
                        <div class="images_list">
                            <div class="image_item">
                                <span class="pic"><img :src="item.pic[0]"></span>
                            </div>
                            <div class="image_item">
                                <span class="pic"><img :src="item.pic[1]"></span>
                            </div>
                            <div class="image_item">
                                <span class="pic"><img :src="item.pic[2]"></span>
                            </div>
                        </div>
                    </dt>    
                    <dd>

                        <p>{{getText(item.content||"")}}</p>
                        <div class="end"><i class="icon_time"></i>{{formatTime(item.createTime)}}</div>
                    </dd>
                </dl>
             </router-link>
               
                
          </div>
          <nav class="nav" v-if="newsType&&newsType.length">
        	<ul class="clearfix">
            	<li>
                	<router-link to="/index/news">
                    	<img src="../images/li_01.png" />
                        <p>新闻中心</p> 
                    </router-link>
                </li>
                
                <li v-for="item in newsType" v-if="item.pic!=null">
                	<router-link :to="'/index/news/'+item._id">
                    	<img :src="item.pic" />
                        <p>{{item.title_type}}</p> 
                   </router-link>
                </li>
                <li>
                	<router-link to="/index/login">
                    	<img src="../images/li_09.png" />
                        <p>用户信息</p> 
                   </router-link>
                </li>
            </ul>
        </nav>
        <div class="news_all">
            <ul class="clearfix">
                <li v-for="item in newsType" v-if="item.pic==null"><router-link :to="'/index/news/'+item._id">{{item.title_type.replace("新闻","")}}</router-link></li>
            </ul> 
        </div>
    </div>

</template>
<style>
.index  .banner{position:relative;display:block;overflow:hidden;width:100%}
.index  .banner li:first-child{display:block}
.index  .banner li{width:100%; height:10rem;line-height:0;display:none;}
.index  .banner img{width:100%; height:10rem;}
.index .banner li>a{ display:block; height: 100%; width: 100%; position: relative; }
.index .banner li>a>span{ position: absolute; display:block; width: 100%; bottom: 0; left: 0; height: 1.8rem; line-height: 1.8rem; box-sizing: border-box; -webkit-border-size:border-box; text-align: center; overflow:hidden; padding:0 .5rem; text-overflow: ellipsis; white-space: nowrap; font-size: .8rem; background:rgba(0,0,0,.5); color: #FFF;}
 .index  .news{ padding:0 .5rem; }
 .index  .news dl{padding:.3rem 0; border-bottom:1px solid #dbdbdb;}
.index   .news dl dt h2{ padding-bottom:.3rem;font-size:.9rem; line-height:1.4; text-align:justify;text-justify:inter-ideograph; }
.index .news dl .images_one{ float:left; width:33%; display:-webkit-box; display: -webkit-flex;  position: relative; } 
.index .news dl .images_one .image_item{-webkit-flex:1 1 0; flex:1 1 0; position:relative; } 
.index .news dl .images_one .image_item::after{
   display:block;content:'';padding-top:65.6%
}
.index .news dl .images_one .image_item .pic{ display: block; position: absolute; top:0;bottom:0;right:0;left:0; }
.index .news dl .images_one .image_item .pic>img{ display: block; height: 100%; width: 100%; }
.index .news dl .images_one+h2{ margin-left:33%; padding-left: .5rem; }
.index .news dl .images_list{ display:-webkit-box;display:-webkit-flex;display:flex; -webkit-flex-wrap:nowrap;justify-content:space-between; position:relative;overflow:hidden;}
.index .news dl .images_list .image_item{ -webkit-flex:1 1 0; flex:1 1 0; position:relative; }
.index .news dl .images_list .image_item:after{
   display:block;content:'';padding-top:65.6%
}
.index .news dl .images_list .image_item .pic{ display: block; position: absolute; top:0;bottom:0;right:0;left:0; }
.index .news dl .images_list .image_item .pic>img{ display: block; height: 100%; width: 100%; }
.index .news dl .images_list .image_item+.image_item{ margin-left:.5rem; }
.index   .news dl dd{ color:#999}
.index   .news dl dd p{overflow: hidden;text-overflow: ellipsis;display:-webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical; margin:.3rem 0; font-size:.8rem;}
.index   .news .end{}
.index   .news .icon_time{ position:relative; top:-2px; display:inline-block; height:.8rem; width:.8rem; padding-left:.3rem; background:url(../images/icon_t.png) no-repeat left center; background-size:.8rem; vertical-align:middle}
 .index .nav li{ background:#f5f5f9; width:33%; float:left; text-align:center; padding:.5rem 0; line-height:2; font-size:.8rem; border-bottom:#fff solid 1px; border-left:1px #fff solid; box-sizing:border-box; -webkit-box-sizing:border-box;}

.index .nav li:nth-child(2),.index   .nav  li:nth-child(5),.index .nav li:nth-child(8){ width:34%}
.news_all{ background: #FFF; padding:0 .2rem; }
.news_all li{ width:25%; box-sizing:border-box; -webkit-box-sizing:border-box; padding:.3rem; float:left;}
.news_all li a{ font-size:.8rem; border-radius:.2rem; border:1px solid #ccc; text-align:center; line-height:1.4rem; height:1.4rem; background:#FFF;}

</style>
<script type="text/javascript">
     export default{
        data(){
            return {
                banner:null,
                news:null,
                newsType:null
            }
        },
        beforeMount(){
            
            this.getPage();
        },
        updated(){
          
            this.touchBanner();
        },
        methods:{
            getPage(){
                const _this=this;
                this.$ajax({
                    url:"/page",
                    method:"post"
                }).then(function(item){
                    console.log(item);
                   _this.$data.banner=item.data.banner;
                   _this.$data.news=item.data.news;
                   _this.$data.newsType=item.data.newsType;
                   
                })

            }

        }

     }  


</script>
  