define('avalonUIwrapper',['avalon','jquery','easyui'],function(){
var wrapper = function(componentName,init){
	 var widget = avalon.ui[componentName] = function(element, data, vmodels) {
		 var options = data[componentName+'Options'];
		 var vmodel  = avalon.define(data[componentName+'Id'],function(vm){
		            vm.wrapperOptions={};
					vm.wrapper={};
			   		avalon.mix(vm, options);
	                vm.$init = function(callback) {//初始化组件的界面，最好定义此方法，让框架对它进行自动化配置
	                	//调用使用wrapper来引用dom对象
						vm.wrapper = $(element);
						//调用初始化方法
						init(vm);
						callback();
                   }
                   vm.$remove = function() {//清空构成UI的所有节点，最好定义此方法，让框架对它进行自动化销毁
                        element.innerHTML =  ""
                   }
		   });
		 vmodel.$skipArray=['wrapperOptions','wrapper'];
		 return vmodel;
	 }
}
return {wrapper:wrapper};
})