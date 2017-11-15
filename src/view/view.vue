<template>
	<section>
		<!--
		<header class="comm-header">
	    	<div class="div">
				<h1 v-if="headerFlg">
					<a href="javascript:history.back();" class="back"><i></i></a>
                     <span class="qun">全站搜索</span>
                     <span class="all"><i></i></span>
				</h1>
				
	    		<h1>
	    			<a href="javascript:history.back();" class="back"><i></i></a>新闻系统<router-link to="/index/login" v-if="!userInfo.userName" class="user_icon"><img src="../images/li_09.png" /></router-link>
	    			<a href="" class="user_icon" v-else @click.prevent="backLogin"><img src="../images/li_09.png" /></a>
	    		</h1>

	    	</div>	
	    </header>
	    -->
	   <router-view name="header"></router-view>
		<div class="app-content">
			<router-view></router-view>
		</div>

	</section>
</template>
