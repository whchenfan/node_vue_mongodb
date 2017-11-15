<template>
	<div>
        <h1>后台管理 &gt; 新闻分类</h1>
        <div class="tit"><h2 class="clearfix">
        <span class="fl">新闻分类</span>
        <router-link to="/index/newsTypeAdd" class="btn btn-blue fr"><i class="comm-w-icon comm-add-icon mgr5"></i><span>添加新闻分类</span></router-link></h2></div>
        <div class="pd20">
           <div class="pdb20 comm-search">
                <label>关键字</label><input type="text" style="width:400px;" class="inp" name="search" value="">
                <label>是否显示</label>
                <nav class="sel" @click="selFn($event)">
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
                        <th class="w100px">添加人</th>
                        <th class="w80px">是否显示</th>
                        <th class="w80px">排序</th>
                        <th class="w170px">操作</th>
                    </tr>
                
                    <tr v-if="list&&list.length" v-for="item in list">
                        <td><router-link :to="{path:'news', query: {id:item._id}}">{{item.title_type}}</router-link></td>
                        <td class="f_c">{{formatTime(item.createTime)}}</td>
                        <td class="f_c">{{item.userInfo.userName}}</td>
                        <td class="f_c">{{item.hidden==1?"显示":"隐藏"}}</td>
                        <td class="pdtb2"><input type="text" :value="item.number" class="inp inp-num"  @change="numberChange($event,item._id)"></td>
                        <td class="pdtb2 f_c"><a href="" @click.prevent="deleteFn($event,item._id,item.hidden)" name="delete" class="btn btn-red"><i class="comm-w-icon comm-del-icon"></i><span>{{item.hidden==1?"隐藏":"显示"}}</span></a><router-link :to="{path:'newsTypeAdd', query: {id:item._id}}" class="btn  btn-blue"><i class="comm-w-icon comm-edit-icon"></i><span>修改</span></router-link></td>
                    </tr>
                    <tr v-if="!(list&&list.length)">
                        <td colspan="6" class="f_c">暂无数据</td>
                    </tr>
            </tbody>
            </table>
           
        </div>
    </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return {
               list:null,
               hidden:3,
               search:""
            }
        },
        beforeMount(){
            this.pageFn();
            this.addEvent();
        },
        methods:{
            pageFn(params={}){
                var _this=this;
                params["hidden"]=_this.$data.hidden;
                params["search"]=_this.$data.search;
                this.$ajax({
                    url:"/admin/newsTypeFind",
                    method:"post",
                    data:params
                }).then(function(response){
                    if(!response.data.code){
                       _this.$data.list=response.data; 
                    }else{
                        _this.$data.list={};  
                    } 
                })
            },
            numberChange($event,id){
                var _this=this,
                    _obj=$event.target;
                if(!_obj.value)return false;    
                this.$ajax({
                    url:"/admin/newsTypeNumber",
                    method:"post",
                    data:{number:_obj.value,_id:id}
                }).then(function(response){
                   _this.alertFn({cont:response.data.rsp});
                })
            },
            deleteFn($event,id,hidden){
                const _this=this;
                if(hidden==1){
                    this.comfrimFn({"cont":"您隐藏了该数据后，它下面的分类数据也将隐藏掉！",fn:function(){_this.changeHideShow(id,hidden)}});
                }else{
                    _this.changeHideShow(id,hidden);
                }
                
            },
            changeHideShow(id,hidden){
               
                const _this=this;
                this.$ajax({
                    url:"/admin/newsTypeHide",
                    method:"post",
                    data:{id:id,hidden:hidden}
                }).then(function(response){
                   _this.alertFn({cont:response.data.rsp,fn:_this.pageFn})
                })
            },
            searchFn(){
                var _this=this;
                let searchObj=document.querySelector("input[name='search']");
                if(_this.$data.search==searchObj.value){
                    _this.alertFn({cont:"您搜索条件没有改变!"});
                    return false;
                }else{
                    _this.$data.search=searchObj.value; 
                }
                _this.pageFn();
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
                           _this.$data.hidden=parseInt(this.getAttribute("date-value"));
                          
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
            }
        },
        beforeDestroy(){
           const _body=document.docmentElement||document.body,
                     _this=this; 
            _body.removeEventListener("click",_this.hideSel,false);
        }
    }

</script>