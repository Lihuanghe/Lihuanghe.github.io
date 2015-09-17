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
			       vm.$DOMelement = el;
			       if(init)
			       		init(vm,el);
			    },
			    $dispose :function(vm,el){
			    	 el.innerHTML =  ""
			    	 if(destroy)
			    	 	destroy(vm.el);
			    	 avalon.log('dispose :' + vm.$id )
			    },
			    $template: template
			});
	}
	return {wrap:wrapper};
});

