export default {
	install(Vue){
		//判断两个值是否相等，如果相等，返回第三个值
		Vue.prototype.hasClass=(item1,item2,className="on")=>item1==item2?className:"";
		//时间转换函数
		Vue.prototype.formatTime=(timestamp=new Date(),formats='Y-m-d')=>{
			    const zero =value=> value < 10?'0'+value:value;
			    const myDate =new Date(timestamp);
			    const year = myDate.getFullYear();
			    const month = zero(myDate.getMonth() + 1);
			    const day = zero(myDate.getDate());
			    const hour = zero(myDate.getHours());
			    const minite = zero(myDate.getMinutes());
			    const second = zero(myDate.getSeconds());	 
			    return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
			        return ({
			            Y: year,
			            m: month,
			            d: day,
			            H: hour,
			            i: minite,
			            s: second
			        })[matches];
			    });
		}
		//仿照alert弹框
		Vue.prototype.alertFn=(opt={})=>{
			
			opt.maskFlg = opt.maskFlg===undefined||opt.maskFlg? true: false;
			opt.objClass = opt.objClass || "comm_alert";
			opt.cont = opt.cont || "未知错误!";
			opt.titleCont = opt.titleCont || "友情提示";
			opt.url = opt.url || "javascript:;";
			const _body=document.querySelector("body");
			if (document.getElementsByClassName("mask").length > 0) {
				opt.mask = document.getElementsByClassName("mask")[0];
				opt.mask.style.display = "block"
			} else {
				opt.mask = document.createElement("div");
				opt.mask.className = "mask";
				_body.appendChild(opt.mask)
			}
			
			opt._this = document.getElementsByClassName(opt.objClass)[0];
			if (!opt._this) {
				opt._this = document.createElement("div");
				opt._this.className = opt.objClass + " box-size";
				opt._this.innerHTML = '<h2>' + opt.titleCont + '</h2><div class="cont">' + opt.cont + '</div><a href="javascript:;" class="btn_alt">确定</a>';
				_body.appendChild(opt._this)
			} else {
				opt._this.style.display = "block";
				opt._this.querySelector("h2").innerHTML=opt.titleCont;
				opt._this.querySelector(".cont").innerHTML=opt.cont;
			}

			opt._this.style.marginTop=-(opt._this.offsetHeight/2)+"px";
			opt._this.style.marginLeft=-(opt._this.offsetWidth/2)+"px";	
			opt.urlObj = opt._this.querySelector(".btn_alt");
			if (opt.fn && Object.prototype.toString.call(opt.fn) === '[object Function]') {
				opt.urlObj.onclick = function() {
					if (opt._this) {
						opt._this.removeAttribute("style");
						opt._this.style.display = "none";
					}
					if (opt.mask)opt.mask.style.display = "none";
						
					opt.fn()
				}
			} else {
				if (opt.url != 'javascript:;') {
					opt.urlObj.setAttribute("href", opt.url)
				} else {
					 opt.urlObj.onclick = function() {
						if (opt._this) {
							opt._this.removeAttribute("style");
							opt._this.style.display = "none";
							opt._this = null
						}
						if (opt.mask) {
							opt.mask.style.display = "none";
							opt.mask = null
						}
					}
			}
		   }
		}
		/*comfrim 弹框效果*/
		Vue.prototype.comfrimFn=(opt={})=>{
			opt.maskFlg = (opt.maskFlg === undefined && opt.maskFlg) ? true: false;
			opt.objClass = opt.objClass || "comm_confirm";
			opt.cont = opt.cont || "网络异常";
			opt.ensureCont = opt.ensureCont || "确定";
			opt.titleCont = opt.titleCont || "友情提示";
			opt.url = opt.url || "javascript:;";
			const _body=document.querySelector("body");
			if (document.getElementsByClassName("mask").length > 0) {
				opt.mask = document.getElementsByClassName("mask")[0];
				opt.mask.style.display = "block"
			} else {
				opt.mask = document.createElement("div");
				opt.mask.className = "mask";
				_body.appendChild(opt.mask)
			}
	
			opt._this = document.getElementsByClassName(opt.objClass)[0];
			if (!opt._this) {
					opt._this = document.createElement("div");
					opt._this.className = opt.objClass + " box-size";
					opt._this.innerHTML = '<h2>' + opt.titleCont + '</h2><div class="cont">' + opt.cont + '</div><ul class="clearfix end"><li><button class="btn_del">取消</button></li><li><a href="javascript:;" class="btn_ensure">' + opt.ensureCont + '</a></li></ul>';
					_body.appendChild(opt._this)
			} else {
				opt._this.style.display = "block";
				opt._this.querySelector("h2").innerHTML=opt.titleCont;
				opt._this.querySelector(".cont").innerHTML=opt.cont;
				opt._this.querySelector(".btn_ensure").innerHTML=opt.ensureCont;
			}

			opt._this.style.marginTop=-opt._this.offsetHeight/2+"px";
			opt._this.style.marginLeft=-opt._this.offsetWidth/2+"px";

		
			opt.urlObj = opt._this.querySelector(".btn_ensure");
			if (opt.fn && Object.prototype.toString.call(opt.fn) === '[object Function]') {
				opt.urlObj.onclick = function() {
					opt._this.removeAttribute("style");
					opt._this.style.display = "none";
					if (opt.mask) opt.mask.style.display = "none";
					
					opt.fn();
				}
			} else {
				if (opt.url != 'javascript:;') {
					opt.urlObj.setAttribute("href", opt.url)
				} else {
					opt.urlObj.onclick = function() {
						
						opt._this.removeAttribute("style");
						opt._this.style.display = "none";
							
						if (opt.mask)opt.mask.style.display = "none";
					
					}
				}
			}
			opt.delObj = opt._this.querySelector(".btn_del");
			opt.delObj.onclick = function() {
				opt._this.removeAttribute("style");
				opt._this.style.display = "none";
				if (opt.mask) {opt.mask.style.display = "none";}
			}

		}
		Vue.prototype.getText=(html)=>{
			/**
			 *  result = Regex.Replace(result, "(<head>).*(</head>)", string.Empty, RegexOptions.IgnoreCase);

 result = Regex.Replace(result, @"<( )*script([^>])*>", "<script>", RegexOptions.IgnoreCase);
 result = Regex.Replace(result, @"(<script>).*(</script>)", string.Empty, RegexOptions.IgnoreCase);

 //remove all styles
 result = Regex.Replace(result, @"<( )*style([^>])*>", "<style>", RegexOptions.IgnoreCase); //clearing attributes
 result = Regex.Replace(result, "(<style>).*(</style>)", string.Empty, RegexOptions.IgnoreCase);
			 */
			return html.replace(/<[^>]+>/g,"").replace(/(\r|\n|\t|\s|&nbsp;)/g,"");
		},
		Vue.prototype.code="";
		Vue.prototype.drawCode=function(id){

			const canvas=document.getElementById(id);

			if(!canvas)return false;
			const txt=canvas.getContext("2d"),
				  height=canvas.clientHeight,
				  width=canvas.offsetWidth,
				   pool = 'ABCDEFGHJKLMNPQRSTUVWXY3456789';
			
			canvas.height=height;
			canvas.width=width;

			this.code="";

			txt.clearRect(0,0,width,height);
			
			//随机生成两个数之间的数字
			var mathBothNum=function(max,min){
				return Math.floor(Math.random()*(max-min))+min;
			}
			//随机生成一个rgb的色值
			var mathColor=function(max,min){
				return 'RGB('+mathBothNum(max,min)+','+mathBothNum(max,min)+','+mathBothNum(max,min)+')';
			}
			//生成六十个小圆点
			for(var i=0;i<60;i++){
				txt.beginPath();
				txt.arc(mathBothNum(0,width),mathBothNum(0,height),mathBothNum(1,3),0,2*Math.PI);
				txt.fillStyle=mathColor(200,155);
				txt.fill();
			}
			//生成四个字符在画布上面
			for(var i=0;i<4;i++){
				//txt.beginPath();
				var fc=pool.charAt(mathBothNum(0,pool.length)),
					fs=mathBothNum(28,20);
				this.code+=fc;
				txt.font=fs+"px Arial";
				txt.fillStyle=mathColor(50,0);
				txt.save();
				txt.translate((i||.4)*23,mathBothNum((height-fs)/2,(height-fs)/4));
				txt.rotate(mathBothNum(30,-30)*Math.PI/180);
				txt.fillText(fc,0,fs);
				txt.restore();
				//保存成原来的属性
			}
		
			//随机生成4条干扰线
			for(var i=0;i<4;i++){
				txt.beginPath();
				//画笔的起始位置
				txt.moveTo(mathBothNum(30,0),mathBothNum(height-2,2));
				//结束位置
				txt.lineTo(mathBothNum(width-2,width-30),mathBothNum(height-2,2));
				//画笔的宽度
				txt.lineWidth=1;
				txt.strokeStyle=mathColor(255,0);
				txt.stroke();
			}
		}
	}

}
