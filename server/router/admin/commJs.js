exports.getSrc=function(strHtml){
		const imgReg=/<img([^\/>]+)src="([^"]+)"([^\/>]+)(\/>|>)/ig;
		const imgRegSrc=/src="([^"]+)"/ig;
		
		return strHtml.match(imgReg)===null?"":strHtml.match(imgReg).reduce(function(a,b){
				return a.concat(b.split(imgRegSrc)[1]);
		},[]);
}
exports.replaceImgSrc=function(strHtml,imgArr,imgHttp){
	return imgArr.reduce(function(a,b){
		return strHtml.replace(b,imgHttp+b);
	      },strHtml);
}