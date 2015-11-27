define(['avalon','jquery'],function(avalon,jquery){

	avalon.library("jq");
	//把jquery的插件包装成一个avalon的组件
	var wrapper = function(name,template,init,destroy){

			avalon.component("jq:"+name, {
				wrapperOptions:{},
			    $replace: true,
			    $DOMelement:{},
			    $init:function(vm,el){
			    	 avalon.log('init :' + vm.$id )
			    },
			    $ready: function (vm,el) {
			    	 //bugfix: https://github.com/RubyLouvre/avalon/issues/1063
			    	 //需要使用function来保存el对象，直接保存在IE8个获取$model属性时报错：对象不支持“hasOwnProperty”属性或方法
			       vm.$DOMelement = el;  
			       if(init)
			       		init(vm,el);
			    },
			    $dispose :function(vm,el){
			    	 el.innerHTML =  ""
			    	 if(destroy)
			    	 	destroy(vm,el);
			    	 avalon.log('dispose :' + vm.$id )
			    },
			    $template: template
			});
	}
	return {wrap:wrapper};
});

