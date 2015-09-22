define(['avalon','jquery','wrapper','config','loading','css!app/assets/css/loading.css'],function(avalon,jquery,wrapper,config){

 var loadingmodule = {
    viewtSrc: "<jq:loading $id='loading'></jq:loading>",
	viewInit:function(){},   //模块view加载完成后的回调方法，在刷新（F5）时可能调用两次
	viewDestroy:function(){} //切换菜单时销毁原来的view
 };

 var errormodule = {
    viewtSrc: '<span>{{curPath}} 页面不存在</span>',
	viewInit:function(){},   //模块view加载完成后的回调方法，在刷新（F5）时可能调用两次
	viewDestroy:function(){} //切换菜单时销毁原来的view
 };

 var model = avalon.define({
                $id: "menuView",
                module : loadingmodule,   //当前的内容模块
                contentSrc:loadingmodule.viewtSrc,
                curPath:"",
				loadView:function(path){
					model.curPath = path;
					//先销毁原来的view
					var oldmodule = model.module;
					if(oldmodule.viewDestroy){
						oldmodule.viewDestroy();
					}

					//使用loading组件先更新view，保证上次的视图的组件成功销毁
					//解决avalon的问题 : https://github.com/RubyLouvre/avalon/issues/1056
					model.contentSrc  = loadingmodule.viewtSrc;
					model.$updateView(loadingmodule); 
					
					//加载新的View
					var mod = config.pathMap.get(path);
					if(mod===undefined){
	               		avalon.log('Error ViewModule have not loaded . you should load module.path into config.pathMap in config.js .path =  ' + path )
	               		model.$updateView(errormodule); 
               		}else{
               			require([mod],function(mod){
               				if(mod===undefined){
			               		avalon.log('Error ViewModule have not loaded . you should load module.path into config.pathMap in config.js .path =  ' + path )
			               		model.$updateView(errormodule); 
		               		}
               				model.$updateView(mod); 
               			});
               		}
					
				},
				$updateView : function(mod){
					model.module = mod;
					model.contentSrc  = mod.viewtSrc;
					setTimeout(mod.viewInit,50)
				}
            });
 return model;
});