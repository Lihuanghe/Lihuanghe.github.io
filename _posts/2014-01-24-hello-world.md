---
layout: post
title: "第一个jekyll Blog:做markdown语法练习"
description: ""
category: 
tags: []
comments: true
theme :
  name : twitter
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
    以四个空格开头，表示引用。


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

### *这是斜体*,用两个*包起来

这是超链接[李黄河的Blog](http://Lihuanghe.github.io)   文字尾的两个空格表示换行  
[麻省理工（MIT）牛人解说数学体系](http://Lihuanghe.github.io/math.html)

* *1这是列表
* *2这是列表
* *3这是列表

+ +这也是  `

		 制制表符宽制表符宽制表符宽制表符
		 宽表符宽
+ +1这也是
+ +2这也是
+ +3这也是

-------------
这是分隔线


- -1这也是
- -2这也是
- -3这也是

10. 这是有序开表，以数字+.开始
18. 这是有序开表，以数字+.开始
1. 这是有序开表，以数字+.开始

这是>的引用
> 这是引用
> > This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,

> consectetuer adip `function(){alert('adsf'}` iscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

*这是强调内容:用*包起来*

**这是强调内容:用\*\*包起来,是粗体**

  
_这是强调内容:用_包起来_

[用pdf2HtmlEx转成简历](/resume.html)

表格

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
<br/>

| left-align  |   central-align  |   right-align     |
|:------------|:----------------:|------------------:|
| left-align  |   central-align  |   right-align     |
