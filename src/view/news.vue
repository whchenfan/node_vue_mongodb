<template>
	<div class="news_list" v-if="dataNews!=null">
        <div class="news">
        <router-link v-for="item in dataNews" :to="'/index/detailed/'+item._id">
        <dl>
           
            <dt v-if="item.pic==''||item.pic==undefined">
                <h2>{{item.title}}</h2>
            </dt>
            <dt v-else-if="item.pic.length<3" class="clearfix">
                <div class="images_one">
                    <div class="image_item">
                        <div class="pic"><img :src="item.pic[0]" /></div>
                    </div>
                </div>
                <h2>{{item.title}}</h2>
            </dt>
            <dt v-else >
                <h2>{{item.title}}</h2>
                <div class="images_list">
                    <div class="image_item">
                        <div class="pic"><img :src="item.pic[0]" /></div>
                    </div>
                    <div class="image_item">
                        <div class="pic"><img :src="item.pic[1]" /></div>
                    </div>
                    <div class="image_item">
                        <div class="pic"><img :src="item.pic[2]" /></div>
                    </div>
                </div>
            </dt>
            <dd>
                <p>{{getText(item.content)}}</p>
                <div class="end"><i class="icon_time"></i>{{formatTime(item.createTime)}}</div>
            </dd>
        </dl>
        </router-link>   
        </div>    
	</div>
    <div v-else-if="dataNews!=null&&!dataNews.length" class="data-null">
        暂无数据
    </div>
</template>
<style>
.news_list{ padding:0 .5rem; font-size:.5rem; line-height:1.6; font-size:.8rem;}
.news_list .news{ padding:0 .5rem; }
.news_list .news dl{padding:.3rem 0; border-bottom:1px solid #dbdbdb;}
.news_list .news dl dt h2{ padding-bottom:.3rem;font-size:.9rem; line-height:1.4; text-align:justify;text-justify:inter-ideograph; }
.news_list .news dl .images_one{ float:left; width:33%; display:-webkit-box; display: -webkit-flex;  position: relative; } 
.news_list .news dl .images_one .image_item{-webkit-flex:1 1 0; flex:1 1 0; position:relative; } 
.news_list .news dl .images_one .image_item::after{
   display:block;content:'';padding-top:65.6%
}
.news_list .news dl .images_one .image_item .pic{ display: block; position: absolute; top:0;bottom:0;right:0;left:0; }
.news_list .news dl .images_one .image_item .pic>img{ display: block; height: 100%; width: 100%; }
.news_list .news dl .images_one+h2{ margin-left:33%; padding-left: .5rem; }
.news_list .news dl .images_list{ display:-webkit-box;display:-webkit-flex;display:flex; -webkit-flex-wrap:nowrap;justify-content:space-between; position:relative;overflow:hidden;}
.news_list .news dl .images_list .image_item{ -webkit-flex:1 1 0; flex:1 1 0; position:relative; }
.news_list .news dl .images_list .image_item:after{
   display:block;content:'';padding-top:65.6%
}
.news_list .news dl .images_list .image_item .pic{ display: block; position: absolute; top:0;bottom:0;right:0;left:0; }
.news_list .news dl .images_list .image_item .pic>img{ display: block; height: 100%; width: 100%; }
.news_list .news dl .images_list .image_item+.image_item{ margin-left:.5rem; }
.news_list .news dl dd{ color:#999}
.news_list .news dl dd p{ overflow: hidden;text-overflow: ellipsis;display:-webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical; margin:.3rem 0; font-size:.8rem; }
.news_list .news .icon_time{ position:relative; top:-2px; display:inline-block; height:.8rem; width:.8rem; padding-left:.3rem; background:url(../images/icon_t.png) no-repeat left center; background-size:.8rem; vertical-align:middle}
</style>
<script>
export default{
    data(){
        return {
            index:1,
            maxPage:1,
            flg:true,
            id:"",
            dataNews:null
        }
    },
    beforeMount(){
        this.$data.id=this.$route.params.id;
        this.getPage();
    },
    updated(){
        const _body=document.documentElement||document.body,
            _this=this;
        window.addEventListener("scroll",_this.scrollFn,false);
    },
    methods:{
        getPage(params={index:1}){
            const _this=this;
             _this.$data.flg=false; 
             if(params.index>_this.$data.maxPage)return false;
            params["id"]=_this.$data.id; 
            _this.$ajax({
                url:"/news",
                method:"post",
                data:params
            }).then(function(res){
               if(!res.data.code){
                    if( _this.$data.index==1){
                       _this.$data.dataNews= res.data.newsDate;
                       _this.$data.maxPage=res.data.maxPage;
                    }else{
                    _this.$data.dataNews=_this.$data.dataNews.concat(...res.data.newsDate);
                    }
                }
                setTimeout(function(){//500毫秒后才能进行下一次分页
                    _this.$data.flg=true; 
                },5E2);
            });
        },
        scrollFn(){
            const scrollTop=(document.body||document.documentElement).scrollTop,
               _this=this,
                outerHeight=this.$root.$el.scrollHeight,   
                height=window.innerHeight;
           if(scrollTop+height+20>outerHeight&&_this.$data.flg){
                _this.$data.index++;
               _this.getPage({index:_this.$data.index})
           }
           
        }

    }
}
</script>