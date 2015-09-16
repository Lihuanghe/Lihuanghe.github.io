define(['avalon','jquery'],function(avalon,jquery){

	avalon.library("jq");
	//把jquery的插件包装成一个avalon的组件
	var wrapper = function(name,element,init){

			avalon.component("jq:"+name, {
				wrapperOptions:{},
			    $replace: true,
			    $init:function(vm,el){
			    	
			    },
			    $ready: function (vm,el) {
			       vm.element = el;
			       init(vm,el);
			    },
			    $dispose :function(vm,el){
			    	 el.innerHTML =  ""
			    },
			    $template: element
			});
	}
	return {wrap:wrapper};
});

