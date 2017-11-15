import Vue from 'vue';
import axios from 'axios'
import VueRouter from 'vue-router';
Vue.use(VueRouter);
Vue.config.silent  = false;
Vue.config.devtools = false;
Vue.config.productionTip = false;
Vue.prototype.$ajax=axios;
import commFn from './js/main';
Vue.use(commFn);


/*
Vue.prototype.formatTime=function(time){
	var date=new Date();
	date.setTime(time);
	return date.getFullYear()+"-"+(function(){var Month=date.getMonth()+1;return Month>9?Month:"0"+Month})()+"-"+(function(){var day=date.getDate();return day>9?day:"0"+day})();	
}*/
//导入视图路由
import routes from './js/router';
const router=routes(VueRouter);
new Vue({
    router,
    el: '#admin'
})





