export default {
	install(Vue){
		Vue.prototype.touchBanner=function(a){
			a=a||{};
			var opt={
			   id:a.id||"banner",//banner的id
			   palyTime:a.palyTime||3E3,//播放的时间
			   delayTime:a.delayTime||2E2,//移动的时间
			   titCell:a.titCell||"li",//包含图片的对象
			   creObj:a.creObj||"div",
			   creObjClassN:a.creObjClassN||"slider-dots",
			   creObjC:a.creObjC||"span",
			   creObjCOn:a.creObjCOn||"on",
			   index:a.index||1,//从第几个开始播放
			   titCellPadding:parseInt(a.titCellPadding,10)||0,
			   titCellMargin:parseInt(a.titCellMargin,10)||0,
			   scrollFag:a.scrollFag||false
			}
			opt.play=a.play==false?false:true;
			var obj=typeof opt.id=="string"?document.getElementById(opt.id.replace("#","")):(opt.id  instanceof jQuery?opt.id[0]:opt.id);
			
			if(!obj)return false;
			var width=obj.offsetWidth;
			var arrLi=obj.querySelectorAll(opt.titCell);
			var _ul=arrLi[0].parentNode;
			var maxL=arrLi.length;
			var tx=0,ty=0,x=0,y=0;
			var index=opt.index;
			var speen=opt.palyTime;
			var clearT=null;
			var urlClick=false;
			var clearTime=null;
			var init=function(){
				if(opt.titCellMargin){_ul.style.marginLeft=opt.titCellMargin+"px";}
				_ul.insertBefore(arrLi[maxL-1].cloneNode(true),arrLi[0]);
				var endLi=arrLi[0].cloneNode(true);
				_ul.appendChild(endLi);
				arrLi=obj.querySelectorAll(opt.titCell);
				maxL=arrLi.length;
				_ul.style.cssText+='display:table;width:'+(width-opt.titCellMargin*2)*maxL+'px; overflow:hidden;';
				Transform(-(index*(width-opt.titCellMargin*2)));
				var div=document.createElement(opt.creObj);
				div.className=opt.creObjClassN;
				obj.appendChild(div);
				for(var i=0;i<maxL;i++){
					arrLi[i].style.cssText="display:table-cell;vertical-align:top;width:"+(width-opt.titCellMargin*2)+"px";
				}
				if(opt.play)clearTime=setTimeout(intval,speen);
				for(var j=0,aObj=_ul.getElementsByTagName("a"),m=aObj.length;j<m;j++){
					aObj[j].onclick=function(event){
						if(!(this.getAttribute("href")==''||this.getAttribute("href")=='javascript:;')){
							window.location.href=this.getAttribute("href");
							//speen=1E10;
							if(clearT){clearTimeout(clearT);clearT=null;}
							clearFn();
						}
					}
				}
			
			}
			var clearFn=function(){
					if(clearT){clearTimeout(clearT);clearT=null;}
					if(clearTime){clearTimeout(clearTime);clearTime=null;}
			}
			var setFan=function(){
				if(clearTime){clearTimeout(clearTime);clearTime=null;}
				if(opt.play){clearTime=setTimeout(intval,speen);clearTime=null;}
			}
			var intval=function(){
				
				index++;
				if(index>=maxL)index=0;
				_ul.style.webkitTransitionDuration=_ul.style.MozTransitionDuration =_ul.style.msTransitionDuration =_ul.style.OTransitionDuration =_ul.style.transitionDuration=opt.delayTime+'ms';
				Transform(-(index*(width-opt.titCellMargin*2)));
				if(clearTime){clearTimeout(clearTime);clearTime=null;}
				topEnd();
				if(opt.play){clearTime=setTimeout(intval,speen);}
			}
			var topEnd=function(){
				var d=setTimeout(function(){
					_ul.style.webkitTransitionDuration=_ul.style.MozTransitionDuration =_ul.style.msTransitionDuration =_ul.style.OTransitionDuration =_ul.style.transitionDuration=0+'ms';
					if(index===0){
						index=maxL-1;
					}else if(index===maxL-1){
						index=1;
					}
					Transform(-(index*(width-opt.titCellMargin*2)));
					clearTimeout(d); d=null;
				},opt.delayTime);
			}
			var _start=function(e){//触摸开始
				if(clearTime){clearFn()}
				_ul.style.webkitTransitionDuration=_ul.style.MozTransitionDuration =_ul.style.msTransitionDuration =_ul.style.OTransitionDuration =_ul.style.transitionDuration='0ms';
				tx=e.touches[0].pageX;ty=e.touches[0].pageY;
				_ul.addEventListener("touchmove",_startMove,false);
				_ul.addEventListener("touchend",_startEnd,false);
			}
			var _startMove=function(e){//触摸移动中
				if(clearTime){clearFn()}
				x=e.touches[0].pageX-tx,y=e.touches[0].pageY-ty;
				e.preventDefault();
				var w=index==0?x:-(index*(width-opt.titCellMargin*2)-x);
				Transform(w);
				if(opt.scrollFag)document.body.scrollTop-=y;
			}
			var _startEnd=function(e){//触摸结束
				if((width-opt.titCellMargin*2)/4<Math.abs(x)){
					if(x>0){
						if(index!=0){index--};
					 }else if(x<0){
						if(index!=maxL-1){index++};
					 }
				}
				_ul.style.webkitTransitionDuration=_ul.style.MozTransitionDuration =_ul.style.msTransitionDuration =_ul.style.OTransitionDuration =_ul.style.transitionDuration=opt.delayTime+'ms';
				Transform(-(index*(width-opt.titCellMargin*2)));
				topEnd();
				_ul.removeEventListener("touchmove",_startMove,false);
				_ul.removeEventListener("touchend",_startEnd,false);
				x=0;
				if(clearT){clearTimeout(clearT);clearT=null;}
				clearT=setTimeout(function(){if(clearT){clearTimeout(clearT);clearT=null;}if(opt.play)clearTime=setTimeout(intval,speen);},opt.delayTime);
			}
			var Transform=function(w){
					_ul.style.webkitTransform = 'translate('+w+'px,0)' + 'translateZ(0)';
					_ul.style.msTransform =_ul.style.MozTransform = _ul.style.OTransform = 'translateX(' + w + 'px)';		
				}
		  
			if(maxL>1){//当数量不大于一时，该程序不执行
				init();
				_ul.addEventListener("touchstart",_start,false);
				
			}	
		}
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
		Vue.prototype.dateDiff = function (timestamp) {
   			// 补全为13位
   			 var arrTimestamp = (timestamp + '').split('');
		     for (let start = 0; start < 13; start++) {
			        if (!arrTimestamp[start]) {
			            arrTimestamp[start] = '0';
			        }
			 }
   			 timestamp = arrTimestamp.join('') * 1;

   			 var minute = 1000 * 60;
    		 var hour = minute * 60;
    		 var day = hour * 24;
    		 var halfamonth = day * 15;
    		 var month = day * 30;
    		 var now = new Date().getTime();
   			 var diffValue = now - timestamp;
    		 // 如果本地时间反而小于变量时间
		   	 if (diffValue < 0) {
		        return '不久前';
		   	 }

		    // 计算差异时间的量级
		    var monthC = diffValue / month;
		    var weekC = diffValue / (7 * day);
		    var dayC = diffValue / day;
		    var hourC = diffValue / hour;
		    var minC = diffValue / minute;

		    // 数值补0方法
		    var zero = function (value) {
		        if (value < 10) {
		            return '0' + value;
		        }
		        return value;
		    };

		    // 使用
		    if (monthC > 12) {
		        // 超过1年，直接显示年月日
		        return (function () {
		            var date = new Date(timestamp);
		            return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
		        })();
		    } else if (monthC >= 1) {
		        return parseInt(monthC) + "月前";
		    } else if (weekC >= 1) {
		        return parseInt(weekC) + "周前";
		    } else if (dayC >= 1) {
		        return parseInt(dayC) + "天前";
		    } else if (hourC >= 1) {
		        return parseInt(hourC) + "小时前";
		    } else if (minC >= 1) {
		        return parseInt(minC) + "分钟前";
		    }
    		return '刚刚';
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
			
			return html.replace(/<[^>]+>/g,"").replace(/(\r|\n|\t|\s|\&nbsp;)/g,"");
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

		},
		Vue.prototype.code=null;
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
