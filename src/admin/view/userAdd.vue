<template>
   <div v-if="userInfo!==null">
        <h1>后台管理 > 添加用户</h1>
        <div class="tit"><h2 class="clearfix">
        <span class="fl">添加用户</span>
        <router-link to="/index/user" class="btn btn-blue fr" ><i class="comm-w-icon comm-back-icon mgr5"></i><span>返回列表页</span></router-link></h2></div>
        <div class="pd20">
            <form action="" method="post">
            <table class="table add-table">
                <tr>
                    <td class="w100px"><em class="label"><span class="icon-prompt">*</span>用户名称：</em></td>
                    <td class="pdtb2"><input placeholder="请输入用户名称" name="userName" :value="userInfo.userName||''"  class="inp inp-w700" type="text" readonly="" /></td>
                </tr>
                <tr>
                    <td class="w100px"><em class="label">创建时间：</em></td>
                    <td class="pdtb2">{{formatTime(userInfo.createTime)}}</td>
                </tr>
                <tr>
                    <td class="w100px"><em class="label">最后登陆时间：</em></td>
                    <td class="pdtb2">{{formatTime(userInfo.loginTime)}}</td>
                </tr>
                <tr>
                    <td class="w100px"><em class="label">是否封号：</em></td>
                    <td class="pdtb2">
                       <nav class="sel" @click.stop="selFn($event)">
                        <input type="text" class="hide" name="hidden" :value="userInfo.hidden">
                        <span><em>{{userInfo.hidden==1?"封号":"没有"}}</em><i></i></span>
                        <ul>
                            
                            <li :class="hasClass(userInfo.hidden,0)" data-value="0">没有</li>
                            <li :class="hasClass(userInfo.hidden,1)" data-value="1" >封号</li>
                        </ul>
                      </nav> 

                    </td>
                </tr>
                <tr>
                    <td class="w100px"><em class="label">权限：</em></td>
                    <td class="pdtb2">
                         <nav class="sel" @click.stop="selFn($event)">
                        <input type="text" class="hide" name="power" :value="userInfo.power">
                        <span><em>{{userInfo.power==2?"管理员":"游客"}}</em><i></i></span>
                        <ul>
                            
                            <li :class="hasClass(userInfo.power,2)" data-value="2">管理员</li>
                            <li :class="hasClass(userInfo.power,1)" data-value="1" >游客</li>
                        </ul>
                      </nav> 
                    </td>
                </tr>
                <tr>
                    <td class="w100px"><em class="label">权限：</em></td>
                    <td><img :src="userInfo.pic||'/images/li_09.png'" width="60px" height="60px"></td>
                </tr>
                <tr>
                    <td class="w100px"><em class="label">&nbsp;&nbsp;</em></td>
                    <td class="pdtb2"><input type="button" class="btn-blue btn mgr6" value="提交" @click="submintForm" /> </td>
                </tr>
            </table>
            </form>
        </div>
    </div>
</template>

<script>

export default{
  data(){
      return {
        userInfo:null,
        flg:true
      }
  },
  beforeMount(){
    this.getData();
  },
  methods:{

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
                            var inp=_thisObj.querySelector("input");
                        
                         inp.value=parseInt(this.getAttribute("data-value"));
                        console.log(parseInt(this.getAttribute("data-value")));
                         _this.$data.userInfo[inp.getAttribute('name')]=parseInt(this.getAttribute("data-value"));
                        }
                    }
                })
          
        },
    getData(){
        const _this=this;
        console.log(_this.$route);
        _this.$ajax({
            method:"post",
            data:{id:_this.$route.params.id},
            url:"/admin/getAdmin"
        }).then(function(res){
            _this.$data.userInfo=res.data;
        })
    },
    submintForm(){
        const _this=this,
             params={
                id:_this.$route.params.id,
                hidden:document.querySelector('input[name="hidden"]').value,
                power:document.querySelector('input[name="power"]').value
             }

        this.$ajax({
            method:"post",
            url:"/admin/updateAdmin",
            data:params
        }).then(function(response) {
            _this.alertFn({cont:response.data.rsp});
        })
    }

  }

}

</script>