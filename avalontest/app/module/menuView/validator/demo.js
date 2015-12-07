define(['avalon','validator','text!app/module/menuView/validator/demo.html','css!app/module/menuView/validator/demo.css'],
    function(avalon,validator,viewHTML){
	
   


   var model = avalon.define({
                $id: "validatorVM"
    });
   
// 定义视图模块
	var viewmod =  {
	    viewtSrc:viewHTML ,
		viewInit:function(){

        },   //模块view加载完成后的回调方法，在刷新（F5）时可能调用两次
		viewDestroy:function(){

        } //切换菜单时销毁原来的view
	 };


	 return viewmod;
});