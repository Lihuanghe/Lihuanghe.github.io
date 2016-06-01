---
layout: post
title: 'webpack 源码解析'
description: "webpack"
category: webpack
tags: [webpack ]
theme :
  name : twitter
---
{% include JB/setup %}

# 序言 

项目上在使用webpack，感叹真是神器，既然是神器，就想探知究竟。

# 总览
	
webpack整体是一个插件架构，所有的功能都以插件的方式集成在构建流程中，通过发布订阅事件来触发各个插件执行。webpack核心使用[Tapable](https://github.com/webpack/tapable) 来实现插件(`plugins`)的binding和applying.
先整体来看一下webpack事件流：*通过在Tapable中打日志获得*

```
        method              event-name
 applyPluginsBailResult entry-option
 applyPlugins after-plugins
 applyPlugins after-resolvers
 applyPlugins environment
 applyPlugins after-environment
 applyPluginsAsyncSeries run
 applyPlugins normal-module-factory
 applyPlugins context-module-factory
 applyPlugins compile
 applyPlugins this-compilation
 applyPlugins compilation
 applyPluginsParallel make
 applyPluginsAsyncWaterfall before-resolve
 applyPluginsWaterfall factory
 applyPluginsWaterfall resolver
 applyPlugins resolve
 applyPlugins resolve-step
 applyPluginsParallelBailResult file
 applyPluginsParallelBailResult directory
 applyPlugins resolve-step
 applyPluginsParallelBailResult result
 applyPluginsAsyncWaterfall after-resolve
 applyPluginsBailResult create-module
 applyPluginsWaterfall module
 applyPlugins build-module
 applyPlugins normal-module-loader
 applyPluginsBailResult program
 applyPluginsBailResult statement
 applyPluginsBailResult evaluate MemberExpression
 applyPluginsBailResult evaluate Identifier document.write
 applyPluginsBailResult call document.write
 applyPluginsBailResult expression document.write
 applyPluginsBailResult expression document
 applyPlugins succeed-module
 applyPlugins seal
 applyPlugins optimize
 applyPlugins optimize-modules
 applyPlugins after-optimize-modules
 applyPlugins optimize-chunks
 applyPlugins after-optimize-chunks
 applyPluginsAsyncSeries optimize-tree
 applyPlugins after-optimize-tree
 applyPluginsBailResult should-record
 applyPlugins revive-modules
 applyPlugins optimize-module-order
 applyPlugins before-module-ids
 applyPlugins optimize-module-ids
 applyPlugins after-optimize-module-ids
 applyPlugins record-modules
 applyPlugins revive-chunks
 applyPlugins optimize-chunk-order
 applyPlugins before-chunk-ids
 applyPlugins optimize-chunk-ids
 applyPlugins after-optimize-chunk-ids
 applyPlugins record-chunks
 applyPlugins before-hash
 applyPlugins hash
 applyPlugins hash
 applyPlugins hash
 applyPlugins hash
 applyPlugins hash-for-chunk
 applyPlugins chunk-hash
 applyPlugins after-hash
 applyPlugins before-chunk-assets
 applyPluginsWaterfall global-hash-paths
 applyPluginsBailResult global-hash
 applyPluginsWaterfall bootstrap
 applyPluginsWaterfall local-vars
 applyPluginsWaterfall require
 applyPluginsWaterfall module-obj
 applyPluginsWaterfall module-require
 applyPluginsWaterfall require-extensions
 applyPluginsWaterfall asset-path
 applyPluginsWaterfall startup
 applyPluginsWaterfall module-require
 applyPluginsWaterfall render
 applyPluginsWaterfall module
 applyPluginsWaterfall render
 applyPluginsWaterfall package
 applyPluginsWaterfall modules
 applyPluginsWaterfall render-with-entry
 applyPluginsWaterfall asset-path
 applyPlugins chunk-asset
 applyPlugins additional-chunk-assets
 applyPlugins record
 applyPluginsAsyncSeries additional-assets
 applyPluginsAsyncSeries optimize-chunk-assets
 applyPlugins after-optimize-chunk-assets
 applyPluginsAsyncSeries optimize-assets
 applyPlugins after-optimize-assets
 applyPluginsAsyncSeries after-compile
 applyPluginsBailResult should-emit
 applyPluginsAsyncSeries emit
 applyPluginsWaterfall asset-path
 applyPluginsAsyncSeries after-emit
 applyPlugins done
```

其中有几个关键节段对应的事件分别是：

- entry-option 初始化option

- run 开始编译

- make 从entry开始递归的分析依赖，对每个依赖模块进行build

- before-resolve - after-resolve    对其中一个模块位置进行解析

- build-module 开始构建 (build) 这个module,这里将使用文件对应的loader加载

- normal-module-loader 对用loader加载完成的module(是一段js代码)进行编译,用 acorn (https://github.com/ternjs/acorn) 编译,生成ast抽象语法树。


- program 开始对ast进行遍历，当遇到require等一些调用表达式时，触发`call require`事件的handler执行，收集依赖，并。如：AMDRequireDependenciesBlockParserPlugin等

- seal 所有依赖build完成，下面将开始对chunk进行优化，比如合并,抽取公共模块,加hash

- bootstrap 生成启动代码

- emit 把各个chunk输出到结果文件

