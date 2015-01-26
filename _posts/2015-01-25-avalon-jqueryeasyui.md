---
layout: post
title: "avalon与jQueryEasyUI混用"
description: "asdfasdfasdfa"
category: [MVVM] 
tags: [avalon ,mvvm,EasyUI]
---
{% include JB/setup %}

avalon是一个类似angularJs的MVVM，支持双向绑定，avalon的widget插件，可用与很多其它的插件共用，这样可以弥补avalonUI控件数据量上的不足。

以EasyUI举例，用下面的通用的avalon widget实现,把EasyUI的控件用avalon包装一层：

```javascript
define('avalonUIwrapper',['avalon','jquery','easyui'],function(){
var wrapper = function(componentName,init){
     var widget = avalon.ui[componentName] = function(element, data, vmodels) {
         var options = data[componentName+'Options'];
         var vmodel  = avalon.define(data[componentName+'Id'],function(vm){
                    vm.wrapperOptions={};
                    vm.wrapper={};
                       avalon.mix(vm, options);
                    //初始化组件的界面，最好定义此方法，让框架对它进行自动化配置
                    vm.$init = function(callback) {
                        //调用使用wrapper来引用dom对象
                        vm.wrapper = $(element);
                        //调用初始化方法
                        init(vm.$model);
                        callback();
                   }
                   //清空构成UI的所有节点，最好定义此方法，让框架对它进行自动化销毁
                   vm.$remove = function() {
                        element.innerHTML =  ""
                   }
           });
         vmodel.$skipArray=['wrapperOptions','wrapper'];
         return vmodel;
     }
}
return {wrapper:wrapper};
})
```
这段代码的使用方法：在定义controller之前，先使用wrapper方法创建widget

```javascript
	 //装配wrapper  
	 wrapper.wrapper('datagrid', function(vm){
		vm.wrapper.datagrid(vm.wrapperOptions);
	 });
	 wrapper.wrapper('calendar', function(vm){
		vm.wrapper.calendar(vm.wrapperOptions);
	 });
	 var testctrl =  avalon.define({
	 ........
	 ........
	});
```

链接内是例子：

1. [avalon+ jqueryEasyUI的例子](/avalon-easyui-demo/easyUIwrapper.html)
2. [avalon+ jqueryUI的例子](/avalon-easyui-demo/jqueryUIwrapper.html)


