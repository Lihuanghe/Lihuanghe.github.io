define(['text!app/module/menuView/selectbug/demo.html'],function(viewHTML){

var topvm = avalon.define({
	$id : "topvm",
	topvalue : 0,
	topclick:function(){
		topvm.topvalue ++ ;
	}
});
topvm.$watch('topvalue',function(){
	avalon.log('topvm.topvalue : ' + topvm.topvalue)
});



// 定义视图模块
	var viewmod =  {
	    viewtSrc: viewHTML,
		viewInit:function(){},   //模块view加载完成后的回调方法，在刷新（F5）时可能调用两次
		viewDestroy:function(){} //切换菜单时销毁原来的view
	 };

	 return viewmod;
});