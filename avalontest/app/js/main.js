define(["app/module/user/user.js",'wrapper'],function(user,wrapper){

/*
 * 加载jqery包装生成的组件
 */
	wrapper.wrap('datagrid', "<table></table>",function(vm,el){
		$(el).datagrid(vm.$model.wrapperOptions);
 	});

	wrapper.wrap('loading', "<div></div>",function(vm,el){
		var target = $(el);
		if(target.hasClass('loading'))	return;
		
		$(el).loadingOverlay();
 	});

//定义主vm
 var model = avalon.define({
                $id: "content-main",
                initcomplete:false, //是否初始化完成
				errDesc:"",
				isLogin : false,
				userName:"",
				passwd:"",
				login:function(){
					 var u = model.userName;
					 var p = model.passwd;

					 user.login(u,p,function(data){
					 	if(data.returnCode ==='0'){
					 		//加载页面
					 		require([ "app/module/nav/headNav.js","app/module/menuView/menuView.js","app/module/nav/contentNav.js"], function(head,nav,view) {

					 			model.isLogin = true;
					 			model.initcomplete = true;
							});
					 	}else{
					 		model.errDesc="用户名、密码错误"
					 		model.initcomplete = true;
					 	}
					 });
				}
			});
//使用空用户登陆一次，如果用户已经后端后返回登陆成功
 model.login();

 return model;
});