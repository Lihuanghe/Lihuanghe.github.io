define(['avalon',"app/module/user/user.js"],function(avalon,user){
 var model = avalon.define({
                $id: "header",
				menu:['个人中心','切换角色','退出'],
				dosomething:function(el){
					
					user.logout(function(){

						avalon.vmodels['content-main'].isLogin = false;
					});
				}
            });
 return model;
});