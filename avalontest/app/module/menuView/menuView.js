define(['avalon','jquery','wrapper','config','loading','css!app/assets/css/loading.css'],function(avalon,jquery,wrapper,config){
	wrapper.wrap('loading', "<div></div>",function(vm,el){
		var target = $(el);
		if(target.hasClass('loading'))	return;
		
		$(el).loadingOverlay();
 	});

 var defaultmodule = {
    viewtSrc: 'app/module/menuView/default.html',
	viewInit:function(){},   //模块view加载完成后的回调方法，在刷新（F5）时可能调用两次
	viewDestroy:function(){} //切换菜单时销毁原来的view
 };

 var errormodule = {
    viewtSrc: 'app/module/menuView/error.html',
	viewInit:function(){},   //模块view加载完成后的回调方法，在刷新（F5）时可能调用两次
	viewDestroy:function(){} //切换菜单时销毁原来的view
 };

 var model = avalon.define({
                $id: "menuView",
                module : defaultmodule,   //当前的内容模块
                contentSrc:defaultmodule.viewtSrc,
                curPath:"",
				loadView:function(path){
					model.curPath = path;
					//先销毁原来的view
					var oldmodule = model.module;
					model.contentSrc  = defaultmodule.viewtSrc;

					if(oldmodule.viewDestroy){
						oldmodule.viewDestroy();
					}

					model.$updateView(defaultmodule); 
					setTimeout(function(){
						//加载新的View
						var mod = config.pathMap.get(path);
						if(mod===undefined){
		               		avalon.log('Error ViewModule have not loaded . you should load module.path into config.pathMap in config.js .path =  ' + path )
		               		model.$updateView(errormodule); 
	               		}else{
	               			model.$updateView(mod); 
	               		}
					},1500);
				},
				$updateView : function(mod){
					model.module = mod;
					model.contentSrc  = mod.viewtSrc;
				},
				 render : function(){
				 	model.module.viewInit();
				 }
            });
 return model;
});