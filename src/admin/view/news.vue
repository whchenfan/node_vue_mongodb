<template>
	<div>
        <h1>后台管理 &gt; 新闻中心</h1>
        <div class="tit"><h2 class="clearfix">
        <span class="fl">新闻中心</span>
        <router-link to="/index/newsAdd" class="btn btn-blue fr"><i class="comm-w-icon comm-add-icon mgr5"></i><span>添加新闻</span></router-link></h2></div>
        <div class="pd20">
            <div class="pdb20 comm-search">
                <label>关键字</label><input type="text" style="width:300px;" class="inp" name="search" value="">
                <label>请选择分类</label>
                <nav class="sel" id="newsType" @click="selFn($event)">
                        <span v-if="!newsType"><em>全部</em><i></i></span>
                        <span v-else><em v-for="item in newsList" v-if="(item._id==newsType)">{{item.title_type}}</em><i></i></span>
                        <ul>
                            <li date-value="" :class="hasClass('',newsType)">全部</li>
                            <li v-for="item in newsList" v-if="item.hidden==1" :class="hasClass(item._id,newsType)" :date-value="item._id">{{item.title_type}}</li>    
                        </ul>
                </nav>
                <label>是否显示</label>
                <nav class="sel" id="hidden" @click="selFn($event)">
                        <span  style="width:80px;"><em>{{hidden==1?"显示":(hidden==3?"全部":"隐藏")}}</em><i></i></span>
                        <ul>
                            <li :class="hasClass(hidden,3)" date-value="3">全部</li>
                            <li :class="hasClass(hidden,0)" date-value="0">隐藏</li>
                            <li :class="hasClass(hidden,1)" date-value="1">显示</li>
                        </ul>
                </nav><input type="button" @click="searchFn()" class="btn-search" value="搜索">
            </div>
            <table class="table table-hover">
                <tbody>
                    <tr>
                        <th>新闻标题</th>
                        <th class="w100px">创建时间</th>
                        <th class="w80px">添加人</th>
                        <th class="w80px">排序</th>
                        <th class="w80px">是否显示</th>
                        <th class="w80px">查看评论</th>
                        <th class="w170px">操作</th>
                    </tr>
                
                    <tr v-if="list.length" v-for="item in list">
                        <td>{{item.title}}</td>
                        <td class="f_c">{{formatTime(item.createTime)}}</td>
                        <td class="f_c">{{item.userInfo.userName}}</td>
                        <td class="pdtb2"><input type="text" :value="item.number" class="inp inp-num"  @change="numberChange($event,item._id)"></td>
                        <td class="f_c">{{item.hidden==1?"显示":"隐藏"}}</td>
                        <td class="f_c"><router-link :to="'/index/discuss/'+item._id" class="btn  btn-blue">查看评论</router-link></td>
                        <td class="pdtb2 f_c">
                        <a href="" @click.prevent="deleteFn($event,item._id,item.hidden)" name="delete" class="btn btn-red"><i class="comm-w-icon comm-del-icon"></i><span>{{item.hidden==1?"隐藏":"显示"}}</span></a>
                        <router-link :to="{path:'newsAdd', query: {id:item._id}}" class="btn  btn-blue"><i class="comm-w-icon comm-edit-icon"></i><span>修改</span></router-link></td>
                    </tr>
                    <tr v-if="!(list&&list.length)">
                        <td colspan="7" class="f_c">暂无数据</td>
                    </tr>
            </tbody>
            </table>
           <div v-if="maxPage>1" class="comm-page f_c pdtb20">
                <ul class="clearfix">

                <li v-if="index>1"><a  @click.prevent="pageFn(index-1)" href="javascript:;">«</a></li>
                <li v-else class="disabled"><a href="javascript:;">«</a></li>
                <li v-for="i in maxPage"><a @click.prevent="pageFn(i)" href="javascript">{{i}}</a></li>
               <li v-if="index<maxPage"><a  @click.prevent="pageFn(index+1)" href="javascript:;">»</a></li>
                <li v-else class="disabled"><a href="javascript:;">»</a></li>
              
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return {
               list:null,
               maxPage:1,
               hidden:3,
               search:"",
               newsType:"",
               newsList:{},
               index:1
            }
        },
        
        beforeMount(){
            if(this.$route.query.id){
                this.$data.newsType=this.$route.query.id;
            }
           this.pageFn();
           this.addEvent();
        },
        methods:{
            pageFn(index){
                const _this=this,
                params={
                        hidden:_this.$data.hidden,
                        search:_this.$data.search,
                        newsType:_this.$data.newsType,
                        index:index||0
                     };
                
                this.$ajax({
                    url:"/admin/newsFind",
                    method:"post",
                    data:params
                }).then(function(response){
                    if(!response.data.code){
                        _this.$data.list=response.data.list;
                        _this.$data.maxPage=response.data.maxPage;
                         _this.$data.index=response.data.index;
                         _this.$data.newsList=response.data.newsList;
                    }else{
                         _this.$data.list={};
                          _this.$data.maxPage=0;
                         _this.$data.newsList=response.data.newsList;
                    }
                  
                })
            },
            numberChange($event,id){
                var _this=this,
                    _obj=$event.target;
                if(!_obj.value)return false;    
                this.$ajax({
                    url:"/admin/numberChange",
                    method:"post",
                    data:{number:_obj.value,id:id}
                }).then(function(response){
                   _this.alertFn({cont:response.data.rsp});
                })
            },
            deleteFn($event,id,hidden=1){
                const _this=this;
                if(hidden==1){
                    _this.comfrimFn({cont:"您确定要隐藏掉该新闻吗？您隐藏了该新闻后前台页面将不显示。",fn:function(){_this.showHide(id,hidden);}})
                }else{
                    _this.showHide(id,hidden);
                }
                
            },
            showHide(id,hidden){
                 const _this=this;
                this.$ajax({
                    url:"/admin/showHide",
                    method:"post",
                    data:{hidden:hidden,id:id}
                }).then(function(response){
                   _this.alertFn({cont:response.data.rsp,fn:_this.pageFn});
                })
            },
            selFn($event){//点击下拉框
                const _thisObj=$event.currentTarget,
                      _ul=_thisObj.querySelector("ul"),
                      _this=this;
                if(_ul.style.display=="block"){
                    _ul.style.display="none";
                }else{
                     _ul.style.display="block";
                }
                [..._ul.querySelectorAll("li")].forEach(function(item){
                    item.onclick=function(event){
                        if(/\bon\b/.test(this.className)){
                           event.stopPropagation();
                        }else{
                          if(_thisObj.id=="hidden"){  
                           _this.$data.hidden=parseInt(this.getAttribute("date-value"));
                           }else if(_thisObj.id=="newsType"){
                                _this.$data.newsType=this.getAttribute("date-value");
                           }
                           
                           _this.pageFn();
                        }
                    }
                })
                event.stopPropagation();
            },
            hideSel(){
               [...document.querySelectorAll("nav.sel ul")].forEach(function(item){
                    if(item.style.display=="block"){
                        item.style.display="none";
                    }
               })

            },
            addEvent(){
                const _body=document.docmentElement||document.body,
                     _this=this;
                _body.addEventListener("click",_this.hideSel,false);
            },
            searchFn(){
                const search=document.querySelector('input[name="search"]');
                if(search.value.trim()){
                    this.$data.search=search.value.trim();
                    this.pageFn();
                }

            }

        },
        beforeDestroy(){
             const _body=document.docmentElement||document.body,
                     _this=this;
                _body.removeEventListener("click",_this.hideSel,false);

        }
    }

</script>