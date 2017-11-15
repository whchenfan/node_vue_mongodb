<template>
	 <div v-if="info!=null">
        <h1>后台管理 > 查看评论详情</h1>
        <div class="tit"><h2 class="clearfix">
        <span class="fl">查看评论详情</span>
        <a href="javascript:;" onclick="window.history.back()" class="btn btn-blue fr" ><i class="comm-w-icon comm-back-icon mgr5"></i><span>返回评论列表</span></a></h2></div>
        <div class="pd20">
			      
            <table class="table add-table">
                <tr>
                    <td class="w100px">发布人</td>
                    <td class="">{{info.userName}}</td>
                </tr>
                <tr>
                    <td class="w100px">发布时间</td>
                    <td class="">{{formatTime(info.createTime)}}</td>
                </tr>
                <tr>
                    <td class="w100px">评论的内容</td>
                    <td class="">{{info.cont}}</td>
                </tr>
               
                <tr v-if="info.replaceUserName">
                    <td class="w100px">回复谁</td>
                    <td class="">{{info.replaceUserName}}</td>
                </tr>
				<tr>
					<td>是否显示</td>
					<td>
						 <nav class="sel" @click="selectFn($event)">
                            <input type="text" class="hide inp" name="type_id" :value="info.hidden">
                            <span><em>{{info.hidden==1?"显示":"隐藏"}}</em><i></i></span>
                            <ul>
                               
                                <li :class="hasClass(info.hidden,0)" date-value="0">隐藏</li>
                                <li :class="hasClass(info.hidden,1)"  date-value="1">显示</li>
                            </ul>
                        </nav>

					</td>

				</tr>
				 <tr>
                    <td class="w100px"><label>&nbsp;&nbsp;</label></td>
                    <td class="pdtb2"><input type="button" class="btn-blue btn mgr6" value="提交" @click="submitFn()" /></td>
                </tr>
             </table>
        </div>
     </div>
</template>
<script>
 export default{
 	data(){
 		return{
 			info:null
 		}
 	},
 	beforeMount(){
 		const _this=this;
 		_this.$ajax({
 			url:"/admin/discussInfo",
 			method:"post",
 			data:{id:_this.$route.params.id}
 		}).then(function(res){
 			_this.$data.info=res.data;

 		})
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
                        _this.$data.info["hidden"]=parseInt(_this.getAttribute("date-value"));
                    }
                }
            },
            submitFn(){
            	const _this=this;
            	 this.$ajax({
	                url:"/admin/discussShowHide",
	                method:"post",
	                data:{hidden:hidden,id:id}
	             }).then(function(response){
	               _this.alertFn({cont:response.data.rsp,fn:_this.getData});
	             })
            }

 	}

 }
</script>

