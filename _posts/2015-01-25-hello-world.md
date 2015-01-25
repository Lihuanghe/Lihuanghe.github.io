---
layout: post
title: "第一个jekyll Blog"
description: ""
category: 
tags: []
---
{% include JB/setup %}
这是大标题
==========

这是小标题
----------

# 这是#的标题

## 这是##的标题

### 这是###的标题

#### 这是####的标题


下面引用一段js代码


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
                        init(vm);
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


