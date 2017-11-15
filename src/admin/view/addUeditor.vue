<template>
   <div>
        <h1>后台管理 > 用户中心</h1>
        <div class="tit"><h2 class="clearfix">
        <span class="fl">网站管理员</span>
        <a class="btn btn-blue fr" href="" ><i class="comm-w-icon comm-back-icon mgr5"></i><span>返回列表页</span></a></h2></div>
        <div class="pd20">
            <form action="" method="post">
            <table class="table add-table">
                <tr>
                    <td class="w100px"><label>标题：</label></td>
                    <td class="pdtb2"><input placeholder="请输入标题"  class="inp inp-w700" type="text" /></td>
                </tr>
                <tr>
                    <td class="w100px"><label>关键字：</label></td>
                    <td class="pdtb2"><input class="inp inp-w700" type="text" /></td>
                </tr>
                <tr>
                    <td class="w100px"><label>搜索字：</label></td>
                    <td class="pdtb2"><input class="inp inp-w700" type="text" /></td>
                </tr>
                <tr>
                    <td class="w100px"><label>类别：</label></td>
                    <td class="pdtb2">
                        <nav class="sel">
                            <input type="text" class="hide" value="0" />
                            <span><em>选择种类</em><i></i></span>
                            <ul>
                                <li date-value="1">国内新闻</li>
                                <li date-value="2">国外新闻</li>
                                <li date-value="3">体育新闻</li>
                                <li date-value="4">社会动态新闻</li>
                            </ul>
                        </nav>
                    </td>
                </tr>
                <tr>
                    <td class="w100px"><label>内容：</label></td>
                    <td class="pdtb2">
                        
                    <script id="editor" type="text/plain" style="width:100%;height:400px;"></script>
                    
                    </td>
                </tr>
                <tr>
                    <td class="w100px"><label>上传图片：</label></td>
                    <td class="pdtb2"><input class="inp" type="text" /></td>
                </tr>
                <tr>
                    <td class="w100px"><label>别名：</label></td>
                    <td class="pdtb2"><input class="inp inp-w300 mgr6" type="text" /><input type="file" @change="changeFile($event)" name="file" class="hide" /><input type="button" class="btn-blue btn" value="上传图片" @click="uploadeFile($event)" /></td>
                </tr>
                <tr>
                    <td class="w100px"><label>排序：</label></td>
                    <td class="pdtb2"><input class="inp" type="text" /></td>
                </tr>
                <tr>
                    <td class="w100px"></td>
                    <td class="pdtb2">
                        <img id="fileImages" src="/images/uploade/1502259490897.jpg"  width="200" height="200" style="display:hidden">
                    </td>
                </tr>
                <tr>
                    <td class="w100px"><label>&nbsp;&nbsp;</label></td>
                    <td class="pdtb2"><input type="submit" class="btn-blue btn mgr6" value="提交" /> <input type="reset" class="btn-red btn" value="重置" /></td>
                </tr>
            </table>
            </form>
        </div>
    </div>
</template>

<script>

require("../ueditor/ueditor.config.js");
require("../ueditor/ueditor.all.min.js");
require("../ueditor/lang/zh-cn/zh-cn.js");
export default{
    data(){
        return {
            ueditor:null,
        }

    },
    mounted(){
       document.getElementById("fileImages").src="/images/uploade/1502258373498.jpg";
       console.log( document.getElementById("fileImages"));
       this.ueditor= UE.getEditor('editor');
    },
    methods:{
        uploadeFile(event){
            const _event=event.target,
                  _previousEle=_event.previousElementSibling||_event.previousSibling;
            _previousEle.click();
        },
        changeFile(event){
            const _event=event.target,
                  _previousEle=_event.previousElementSibling||_event.previousSibling;
            var formdata = new FormData();
             formdata.append('file',_event.files[0]);
             this.$ajax({
                url:'/admin/uploadeFile',
                method:'post',
                data:formdata,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(function(res){
               var img=document.getElementById("fileImages");
               img.style.display="block";
               console.log(res.data.src);
               img.src=res.data.src;
                console.log(img.src);
            })
        }

    },
    beforeDestroy(){
      this.ueditor.destroy();
    }
}

</script>