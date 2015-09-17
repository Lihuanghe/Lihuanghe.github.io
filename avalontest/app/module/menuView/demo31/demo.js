define(['config'],function(config){


// 定义视图模块并注册取config.pathMap里供菜单调用
	var viewmod =  {
	    viewtSrc: 'app/module/menuView/demo31/demo.html',
		viewInit:function(){},   //模块view加载完成后的回调方法，在刷新（F5）时可能调用两次
		viewDestroy:function(){} //切换菜单时销毁原来的view
	 };
	 config.pathMap.put('/31',viewmod);

	 return {};
});