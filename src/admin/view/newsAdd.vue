<template>
   <div>
        <h1>后台管理 > 用户中心</h1>
        <div class="tit"><h2 class="clearfix">
        <span class="fl">网站管理员</span>
        <a class="btn btn-blue fr" href="" ><i class="comm-w-icon comm-back-icon mgr5"></i><span>返回列表页</span></a></h2></div>
        <div class="pd20">
            
            <table class="table add-table">
                <tr>
                    <td class="w100px"><label><span class="icon-prompt">*</span>标题：</label></td>
                    <td colspan="3" class="pdtb2"><input placeholder="请输入标题" :value="list.title||''" name="title"  class="inp inp-w700" type="text" /></td>
                </tr>
                <tr>
                    <td class="w100px"><label>关键字：</label></td>
                    <td colspan="3" class="pdtb2"><input placeholder="请输入标题" :value="list.keywords||''" name="keywords"  class="inp inp-w700" type="text" /></td>
                </tr>
                <tr>
                    <td class="w100px"><label>描述：</label></td>
                    <td colspan="3" class="pdtb2">
                    <input placeholder="请输入标题" :value="list.description||''" name="description"  class="inp inp-w700" type="text" />
					
					</td>
                </tr>
               
                <tr>
                    <td class="w100px"><label><span class="icon-prompt">*</span>所需分类：</label></td>
                    <td class="pdtb2">
                       <nav class="sel" @click="selectFn($event)">
                            <input type="text" class="hide inp" name="type_id" :value="list.news_type?list.news_type._id:0">
                            <span><em>{{list.news_type?list.news_type.title_type:"选择种类"}}</em><i></i></span>
                            <ul>
                                <li date-value="0">选择种类</li>
                                <li v-for="item in newsType" :date-value="item._id">{{item.title_type}}</li>
                            </ul>
                        </nav>
                    </td>
                    <td>首页banner推荐:<input v-if="list.recommendBanner==1" type="checkbox" checked="true" value="1" name="recommendBanner" />
                    <input v-else type="checkbox" value="1" name="recommendBanner" /></td>
                    <td>首页推荐:<input v-if="list.recommend==1" checked="true"
                     type="checkbox" name="recommend" value="" /><input v-else
                     type="checkbox" name="recommend" value="" /></td>
                </tr>
                <tr>
                    <td class="w100px"><label><span class="icon-prompt">*</span>内容：</label></td>
                    <td colspan="3" class="pdtb2">
                        
                    <script id="editor" type="text/plain" style="width:100%;height:400px;"></script>
                    
                    </td>
                </tr>
                <tr>
                    <td class="w100px"><label>排序：</label></td>
                    <td colspan="3" class="pdtb2"><input name="number" class="inp" :value="list.number||''" type="text" /></td>
                </tr>
                 <tr>
                    <td class="w100px"><label>新闻来源：</label></td>
                    <td colspan="3" class="pdtb2"><input name="source" class="inp inp-w700" :value="list.source||''" type="text" /></td>
                </tr>
                <tr>
                    <td class="w100px"><label>新闻来源地址：</label></td>
                    <td colspan="3" class="pdtb2"><input name="sourceAddress" class="inp inp-w700" :value="list.sourceAddress||''" type="text" /></td>
                </tr>
                <!--<tr>
                    <td class="w100px"><label>图片前缀：</label></td>
                    <td class="pdtb2"><input name="imgScr" class="inp inp-w700" type="text" /></td>
                </tr>-->
                <tr>
                    <td class="w100px"><label>&nbsp;&nbsp;</label></td>
                    <td colspan="3" class="pdtb2"><input type="button" class="btn-blue btn mgr6" value="提交" @click="addTypeFn()" /> </td>
                </tr>
               
            </table>
            </form>
        </div>
    </div>
</template>
<script >
require("../ueditor/ueditor.config.js");
require("../ueditor/ueditor.all.min.js");
require("../ueditor/lang/zh-cn/zh-cn.js");
var ueditor=null;
    export default{
        data(){
            return {
                flg:false,
                src:"",
                list:{},
                newsType:{}
            }
        },
        
        mounted(){
          var _this=this;
         
          ueditor= UE.getEditor('editor');

           this.$ajax({
                    url:'/admin/newsFindIdTitle',
                    method:'post',
            }).then(function(res){
              if(!res.data.code)
               _this.$data.newsType=res.data;
               
           })
          if(this.$route.query.id){
            
             _this.$data.id=this.$route.query.id;    
            this.$ajax({
                    url:'/admin/newsFindId',
                    method:'post',
                    data:{id:_this.$data.id},
            }).then(function(res){
                if(res.data.code){
                    _this.alertFn({cont:res.data.rsp});
                }else{
                     _this.$data.list=res.data;
                    _this.$data.src=res.data.pic
                   
                    ueditor.ready(function() {
                       ueditor.setContent(res.data.content);
                    });
                }
            })
            }
        },
        methods:{
            selectFn($event){
              var obj=$event.currentTarget,
                  _this=this,
                  ul=obj.querySelector("ul"),
                  inp=obj.querySelector("input"),
                  _em=obj.querySelector("em"),
                  _li=ul.querySelectorAll("li");
                 
                if(ul.style.display=="block"){
                  ul.style.display="none";
                }else{
                  ul.style.display="block";
                }    
                for(let i=0;i<_li.length;i++){
                    _li[i].onclick=function(){
                        _em.innerHTML=this.innerHTML;
                        inp.value=this.getAttribute("date-value");
                        
                    }
                }
            },
            addTypeFn(){
                var params={},_this=this;
                if(this.$data.flg)return false;
               
               const inp=document.querySelectorAll('.add-table input.inp');
               const type_id=document.querySelector('input[name="type_id"]');
               if(!document.querySelector('input[name="title"]').value){
                    _this.alertFn({cont:"标题不能为空"});return false;
               };
               if(type_id.value==='0'){
                 _this.alertFn({cont:"选择新闻的分类不能为空！"});
                    return false;
               }
               if(!ueditor.getContent()){
                _this.alertFn({cont:"添加的内容不能为空！"});
               }else{
                  params["content"]=ueditor.getContent()
               }
               this.$data.flg=true;
               for(let i=0,m=inp.length;i<m;i++){
                    if(inp[i].value){
                       params[inp[i].getAttribute("name")]=inp[i].value;
                    }
               }
               const userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
               params["userId"]=userInfo._id;
               params["userName"]=userInfo.userName;
               if(this.$route.query.id){
                  params["id"]=this.$route.query.id
               }
             const recommend=document.querySelector('input[name="recommend"]');
                if(recommend.checked){
                  params['recommend']=1;
                }else{
                  params['recommend']=0;

                }
              const recommendBanner=document.querySelector('input[name="recommendBanner"]');
                  if(recommendBanner.checked){
                    params['recommendBanner']=1;
                  }else{
                    params['recommendBanner']=0;

                  }
            
                 this.$ajax({
                      url:'/admin/newsAdd',
                      method:'post',
                      data:params
                  }).then(function(res){
                       _this.$data.flg=false;
                       _this.alertFn({cont:res.data.rsp});
                  })
          
            },
            uploadeFile(event){
                const _event=event.target,
                      _previousEle=_event.previousElementSibling||_event.previousSibling;
                _previousEle.click();
           },
            changeFile(event){
                const _event=event.target,
                     _this=this,
                      _previousEle=_event.previousElementSibling||_event.previousSibling;
               if(!_event.value)return false;
               if(['jpg',"png","gif"].indexOf(_event.value.substr(_event.value.length-3))==-1){
                  _this.alertFn({cont:"上传文件格式不对！"});
                   
                     return false;
                }    
                var formdata = new FormData();
                 formdata.append('file',_event.files[0]);
                 this.$ajax({
                    url:'/admin/uploadeFile',
                    method:'post',
                    data:formdata,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then(function(res){
                    if(!res.data.code){
                        _this.$data.src=res.data.src;
                    }   
                })
            }

        },
      beforeDestroy(){
        ueditor.destroy();
      }

  
    }
</script>
