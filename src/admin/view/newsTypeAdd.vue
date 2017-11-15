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
                    <td class="pdtb2"><input placeholder="请输入标题" :value="list.title_type||''" name="title"  class="inp inp-w700" type="text" /></td>
                </tr>
                <tr>
                    <td class="w100px"><label>关键字：</label></td>
                    <td class="pdtb2"><input placeholder="请输入标题" :value="list.keywords||''" name="keywords"  class="inp inp-w700" type="text" /></td>
                </tr>
                <tr>
                    <td class="w100px"><label>描述：</label></td>
                    <td class="pdtb2">
						<textarea name="description" class="text">{{list.description||''}}</textarea>
					</td>
                </tr>
               
                <tr>
                    <td class="w100px"><label>上传图片：</label></td>
                     <td class="pdtb2"><input class="inp inp-w300 mgr6" style="display:none" type="text" name="pic" :value="src" /><input type="file" @change="changeFile($event)" name="file" class="hide" /><input type="button" class="btn-blue btn" value="上传图片" @click="uploadeFile($event)" /></td>
                </tr>
               <tr v-if="!!src">
                    <td class="w100px">上传的图片</td>
                    <td class="pdtb2">
                        <img  :src="src">
                    </td>
                </tr>
                <tr>
                    <td class="w100px"><label>排序：</label></td>
                    <td class="pdtb2"><input name="number" class="inp" :value="list.number||''" type="text" /></td>
                </tr>
                <tr>
                    <td class="w100px"><label>&nbsp;&nbsp;</label></td>
                    <td class="pdtb2"><input type="button" class="btn-blue btn mgr6" value="提交" @click="addTypeFn()" /> <input type="reset" class="btn-red btn" value="重置" /></td>
                </tr>
            </table>
            </form>
        </div>
    </div>
</template>
<script >
    export default{
        data(){
            return {
                params:{},
                flg:false,
                src:"",
                list:{},
                id:""
            }
        },
        mounted(){
          
          if(this.$route.query.id){
            var _this=this;
             _this.$data.id=this.$route.query.id;
                 
            this.$ajax({
                    url:'/admin/newsTypeFindId',
                    method:'post',
                    data:{id:_this.$data.id},
            }).then(function(res){
               
                if(res.data.code){
                    _this.alertFn({cont:res.data.rsp});
                }else{
                    _this.$data.list=res.data[0];
                    _this.$data.src=res.data[0].pic;
                    
                }
            })
            }
        },
        methods:{
            addTypeFn(){
                var params={};
                const _this=this;
                if(this.$data.flg)return false;
               
               const inp=document.querySelectorAll('.add-table input.inp');
               if(!document.querySelector('input[name="title"]').value){
                    _this.alertFn({cont:"标题不能为空！"});
                    return false;
               };
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
               this.$data.flg=true;
               this.$ajax({
                    url:'/admin/newsTypeAdd',
                    method:'post',
                    data:params
                }).then(function(res){
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
                    }else{
                      _this.alertFn({cont:res.data.rsp})
                    }   
                })
            }

        }

    }
</script>
