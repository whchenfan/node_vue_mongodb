<template>
	<section v-if="data!==null">
		<h1>后台管理 &gt; 评论列表</h1>
		<div class="pd20">
			<div class="pdb20 comm-search">
		            <label>关键字</label><input type="text" style="width:300px;" class="inp" name="search" value="">
		    
		            <label>是否显示</label>
		            <nav class="sel" id="hidden" @click="selFn($event)">
		                    <span  style="width:80px;"><em>{{hidden==3?"全部":(hidden==1?"显示":"隐藏")}}</em><i></i></span>
		                    <ul>
		                       <li :class="hasClass(hidden,3)" date-value="3">全部</li>
		                       <li :class="hasClass(hidden,0)" date-value="0">隐藏</li>
		                       <li :class="hasClass(hidden,1)" date-value="1">显示</li>
		                    </ul>
		            </nav>
		            <input type="button" class="btn-search" @click="searchFn()" value="搜索">
		    </div>
			 <table class="table table-hover">
	                <tbody>
	                    <tr>
	                        <th>内容</th>
	                        
	                        <th class="w80px">发布人</th>
	                        <th class="w100px">发布时间</th>
	                        <th class="w80px">是否显示</th>
	                        <th class="w80px">查看评论</th>
	                        <th class="w80px">操作</th>
	                    </tr>
	                    <tr v-if="data.length===0">
							<td class="f_c" colspan="7">暂无数据</td>
	                    </tr>

	                    <tr v-else v-for="item in data">
							<td>{{item.cont}}</td>
							<td class="f_c">{{item.userName}}</td>
							<td class="f_c">{{formatTime(item.createTime)}}</td>
							<td class="f_c ">{{item.hidden==1?"显示":"隐藏"}}</td>
							<td class="f_c pdtb2"><router-link :to="'/index/discussDetailed/'+item._id" class="btn  btn-blue">详情</router-link></td>
							<td class="f_c"><a href=""  @click.prevent="hideShowFn($event,item._id)" name="delete" :data-hidden="item.hidden" class="btn btn-red"><i class="comm-w-icon comm-del-icon"></i><span>{{item.hidden==1?"隐藏":"显示"}}</span></a></td>
	                    </tr>
	                </tbody>
	              
	         </table>
	          <div v-if="maxPage>1" class="comm-page f_c pdtb20">
                <ul class="clearfix">
                <li v-if="index>1"><a  @click.prevent="getData(index-1)" href="javascript:;">«</a></li>
                <li v-else class="disabled"><a href="javascript:;">«</a></li>
                <li v-for="i in maxPage"><a @click.prevent="getData(i)" href="javascript">{{i}}</a></li>
               <li v-if="index<maxPage"><a  @click.prevent="getData(index+1)" href="javascript:;">»</a></li>
                <li v-else class="disabled"><a href="javascript:;">»</a></li>
                </ul>
            </div>
	       </div>
	</section>
</template>
<script>
export default{
	data(){
		return{
			data:null,
			hidden:3,
			search:"",
			index:0,
			id:null,
			maxPage:0
		}
	},
	beforeMount(){
		this.$data.id=this.$route.params.id;
		this.getData();
	},
	methods:{
		getData(index=1){
			const _this=this;
			 _this.$data.index=index;
			 const params={
			 	id:this.$data.id,
			 	hidden:this.$data.hidden,
			 	search:this.$data.search,
			 	index:this.$data.index
			 }
			 _this.$ajax({
			 	url:"/admin/discuss",
			 	method:"post",
			 	data:params
			 }).then(function(req){
			 	
			 	 if(req.data.code){
			 	 	_this.$data.data={};
			 	 	_this.$data.maxPage=0;
			 	 }else{
			 	 	_this.$data.data=req.data.listData;
			 	 	_this.$data.maxPage=req.data.maxPage;
			 	 }
			 	
			 });
		},
		hideShowFn($event,id){
			const _thisObj=$event.currentTarget,
				  _this=this,
				  hidden=parseInt(_thisObj.getAttribute("data-hidden"));
		    if(hidden==1){
                    _this.comfrimFn({cont:"你确定要隐藏该评论吗?隐藏该评论前台页面将不显示该评论。",fn:function(){_this.hiddenAjax(id,0);}})
            }else{
                _this.hiddenAjax(id,1);
            }
		},
		hiddenAjax(id,hidden,obj){
			 const _this=this;
            this.$ajax({
                url:"/admin/discussShowHide",
                method:"post",
                data:{hidden:hidden,id:id}
            }).then(function(response){
               _this.alertFn({cont:response.data.rsp,fn:_this.getData});
            })
		},
		searchFn(){
			const search=document.querySelector('input[name="search"]');
			if(search.value.trim()===""&&this.$data.search===""){
 				search.focus();
			}else{
				this.$data.search=search.value.trim()
 				this.getData();
			}
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
                           _this.$data.hidden=parseInt(this.getAttribute("date-value"));
                        
                           _this.getData(1);
                        }
                    }
                })
                //event.stopPropagation();
		}
	}

}
</script>