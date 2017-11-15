<template>
	<div v-if="list!==null">
        <h1>后台管理 &gt; 用户中心</h1>
        <div class="tit"><h2 class="clearfix">
        <span class="fl">网站管理员</span>
         </h2></div>
        <div class="pd20">
            <div class="pdb20 comm-search">
                <label>关键字</label><input type="text" style="width:400px;" class="inp" name="" value="">
                <label>是否封号</label>
                <nav class="sel" @click.stop="selFn($event)">
                        <input type="text" class="hide" value="0">
                        <span><em>全部</em><i></i></span>
                        <ul>
                            <li :class="hasClass(hidden,3)" data-value="3">全部</li>
                            <li :class="hasClass(hidden,0)" data-value="0">没有</li>
                            <li :class="hasClass(hidden,1)" data-value="1" >封号</li>
                        </ul>
                </nav><input type="submit" class="btn-search" value="搜索">
                
            </div>
            <table class="table table-hover" v-if="maxPage>0">
                <tbody>
                <tr>
                    <th class="w80px">权限</th>
                    <th>用户名称</th>
                    <th class="w80px">是否封号</th>
                    <th class="w100px">注册时间</th>
                    <th class="w100px">最后登录时间</th>
                    <th class="w170px">操作</th>
                </tr>
               
                <tr v-for="item in list">
                    <td class="f_c">{{item.power==2?"管理员":"游客"}}</td>
                    <td>{{item.userName}}</td>
                    <th class="f_c">{{item.hidden==1?"封号":"没有"}}</th>
                    <td class="f_c">{{formatTime(item.createTime)}}</td>
                    <td class="f_c">{{formatTime(item.loginTime)}}</td>
                    <td class="pdtb2 f_c"><a href="" name="delete" class="btn btn-red" @click.prevent="hiddenFn(item._id,item.hidden)"><i class="comm-w-icon comm-del-icon"></i><span>{{item.hidden==1?"解封":"封号"}}</span></a><router-link :to="'/index/userAdd/'+item._id" typeid="" class="btn  btn-blue"><i class="comm-w-icon comm-edit-icon"></i><span>修改</span></router-link></td>
                </tr>  
            </tbody></table>
            <div class="comm-page f_c pdt20" v-if="maxPage>1">
                <ul class="clearfix">
                <li :class="hasClass(index,1,'disabled')"><a href="javascript:;" v-if="index!=1" @click="getDate(index-1)">«</a><a href="javascript:;" v-else>«</a></li>
                <li v-for="page in maxPage" :class="hasClass(page,index,'disabled')">
                    <a v-if="index!=page" href="javascript:;" @click="getDate(page)">{{page}}</a>
                    <a v-else href="javascript:;" @click="getDate(page)">{{page}}</a>
                </li>
                <li :class="hasClass(index,maxPage,'disabled')"><a href="javascript:;" v-if="index!=maxPage" @click="getDate(index+1)">»</a><a href="javascript:;" v-else>»</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script >
    export default{
      data(){
        return {
            list:null,
            index:1,
            hidden:3,
            seach:"",
            maxPage:0
        }
      },
      beforeMount(){
        this.getDate();
      },
      methods:{
        hiddenFn(id,hidden){
            const _this=this;
            if(hidden==0){
                this.comfrimFn({cont:"您缺点要将此账号进行封号吗!如果封号此账号将无法登陆。",fn:()=>{_this.showHide(id,hidden)}})
            }else{
                _this.showHide(id,hidden);
            }
        },
        showHide(id,hidden){
            const _this=this;
            _this.$ajax({
                method:"post",
                url:"/admin/adminShowHide",
                data:{id,hidden}
            }).then(function(req){
                _this.alertFn({cont:req.data.rsp,fn:function(){_this.getDate(_this.$data.index)}})
            })
        },
        selFn($event){
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
                           _this.$data.hidden=parseInt(this.getAttribute("data-value"));
                        
                           _this.getDate();
                        }
                    }
                })
                //event.stopPropagation();
        },
         getDate(index=1){
            const _this=this;
            _this.$data.index=index;
            const params={
                seach:_this.$data.seach,
                hidden:_this.$data.hidden,
                index:_this.$data.index,
            }
            _this.$ajax({
                    url:"/admin/adminInfo",
                    method:"post",
                    data:params
                }).then(function(response){
                   if(!response.data.code){
                        _this.$data.list=response.data.list;
                        _this.$data.maxPage=response.data.maxPage;
                   }else{
                        _this.$data.list={};
                   }
                })
         },

      }
    }


</script>
