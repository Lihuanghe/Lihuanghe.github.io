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
         method                       event-name
--------------------------------------------------
applyPluginsBailResult           |   entry-option
applyPlugins                     |   after-plugins
applyPlugins                     |   after-resolvers
applyPlugins                     |   environment
applyPlugins                     |   after-environment
applyPluginsAsync                |   before-run
applyPluginsAsyncSeries          |   run
applyPlugins                     |   normal-module-factory
applyPlugins                     |   context-module-factory
applyPlugins                     |   compile
applyPlugins                     |   this-compilation
applyPlugins                     |   compilation
applyPluginsParallel             |   make
applyPluginsAsyncWaterfall       |   before-resolve
applyPluginsWaterfall            |   factory
applyPluginsWaterfall            |   resolver
applyPlugins                     |   resolve
applyPlugins                     |   resolve-step
applyPluginsParallelBailResult   |   file
applyPluginsParallelBailResult   |   directory
applyPlugins                     |   resolve-step
applyPluginsParallelBailResult   |   result
applyPluginsAsyncWaterfall       |   after-resolve
applyPluginsBailResult           |   create-module
applyPluginsWaterfall            |   module
applyPlugins                     |   build-module
applyPlugins                     |   normal-module-loader
applyPluginsBailResult           |   program
applyPluginsBailResult           |   statement
applyPluginsBailResult           |   evaluate MemberExpression
applyPluginsBailResult           |   evaluate Identifier document.write
applyPluginsBailResult           |   call document.write
applyPluginsBailResult           |   expression document.write
applyPluginsBailResult           |   expression document
applyPlugins                     |   succeed-module
applyPlugins                     |   seal
applyPlugins                     |   optimize
applyPlugins                     |   optimize-modules
applyPlugins                     |   after-optimize-modules
applyPlugins                     |   optimize-chunks
applyPlugins                     |   after-optimize-chunks
applyPluginsAsyncSeries          |   optimize-tree
applyPlugins                     |   after-optimize-tree
applyPluginsBailResult           |   should-record
applyPlugins                     |   revive-modules
applyPlugins                     |   optimize-module-order
applyPlugins                     |   before-module-ids
applyPlugins                     |   optimize-module-ids
applyPlugins                     |   after-optimize-module-ids
applyPlugins                     |   record-modules
applyPlugins                     |   revive-chunks
applyPlugins                     |   optimize-chunk-order
applyPlugins                     |   before-chunk-ids
applyPlugins                     |   optimize-chunk-ids
applyPlugins                     |   after-optimize-chunk-ids
applyPlugins                     |   record-chunks
applyPlugins                     |   before-hash
applyPlugins                     |   hash
applyPlugins                     |   hash
applyPlugins                     |   hash
applyPlugins                     |   hash
applyPlugins                     |   hash-for-chunk
applyPlugins                     |   chunk-hash
applyPlugins                     |   after-hash
applyPlugins                     |   before-chunk-assets
applyPluginsWaterfall            |   global-hash-paths
applyPluginsBailResult           |   global-hash
applyPluginsWaterfall            |   bootstrap
applyPluginsWaterfall            |   local-vars
applyPluginsWaterfall            |   require
applyPluginsWaterfall            |   module-obj
applyPluginsWaterfall            |   module-require
applyPluginsWaterfall            |   require-extensions
applyPluginsWaterfall            |   asset-path
applyPluginsWaterfall            |   startup
applyPluginsWaterfall            |   module-require
applyPluginsWaterfall            |   render
applyPluginsWaterfall            |   module
applyPluginsWaterfall            |   render
applyPluginsWaterfall            |   package
applyPluginsWaterfall            |   modules
applyPluginsWaterfall            |   render-with-entry
applyPluginsWaterfall            |   asset-path
applyPlugins                     |   chunk-asset
applyPlugins                     |   additional-chunk-assets
applyPlugins                     |   record
applyPluginsAsyncSeries          |   additional-assets
applyPluginsAsyncSeries          |   optimize-chunk-assets
applyPlugins                     |   after-optimize-chunk-assets
applyPluginsAsyncSeries          |   optimize-assets
applyPlugins                     |   after-optimize-assets
applyPluginsAsyncSeries          |   after-compile
applyPluginsBailResult           |   should-emit
applyPluginsAsyncSeries          |   emit
applyPluginsWaterfall            |   asset-path
applyPluginsAsyncSeries          |   after-emit
applyPlugins                     |   done
```

其中有几个关键节段对应的事件分别是：

- `entry-option` 初始化option

- `run` 开始编译

- `make` 从entry开始递归的分析依赖，对每个依赖模块进行build

- `before-resolve` - `after-resolve`    对其中一个模块位置进行解析

- `build-module` 开始构建 (build) 这个module,这里将使用文件对应的loader加载

- `normal-module-loader` 对用loader加载完成的module(是一段js代码)进行编译,用 [acorn](https://github.com/ternjs/acorn) 编译,生成ast抽象语法树。

- `program` 开始对ast进行遍历，当遇到require等一些调用表达式时，触发`call require`事件的handler执行，收集依赖，并。如：AMDRequireDependenciesBlockParserPlugin等

- `seal` 所有依赖build完成，下面将开始对chunk进行优化，比如合并,抽取公共模块,加hash

- `bootstrap` 生成启动代码

- `emit` 把各个chunk输出到结果文件

# webpack的关键实体

**模块**,**依赖**,**模块工厂**

![Webpack Class](/assets/images/webpack-module.png)

## 模块 

`Module`是webpack的中的核心实体，要加载的一切和所有的依赖都是Module，总之一切都是Module。它有很多子类：`RawModule`,`NormalModule` ,`MultiModule`,`ContextModule`,`DelegatedModule`,`DllModule`,`ExternalModule` 等

## 依赖 

每一个依赖(Dependency)的实体都包含一个module字段，指向被依赖的Module. 这样通过Module的dependencies数组成员就能找出该模块所依赖的其它模块。
webpack使用不同的Dependency子类，如`AMDRequireDependency` ，`AMDDefineDependency` ，`AMDRequireArrayDependency`，`CommonJsRequireDependency`，`SystemImportDependency`来表式不同的模块加载规范，
通过对应的`DependencyParserPlugin`来加载  `AMD`或`CMD`的模块。 后面会专门讲不同`DependencyParserPlugin`的实现方式 。

## 依赖模版`Template`

每个依赖都有相应Template，用来生成加载该依赖模块的js代码。


## 模块工厂

使用工厂模式创建不同的Module,有四个主要的子类： `NormalModuleFactory`,`ContextModuleFactory` , `DllModuleFactory`,`MultiModuleFactory`.

# 调用过程

webpack的实际入口是`Compiler`类的`run`方法， 在run方法里调用`compile`方法开始编译。在编译的时候会使用一个核心对象：`Compilation`.

## 核心对象Compilation

该对象负责组织整个编译过程，包含了每个构建环节所对应的方法，如：`addEntry` ,buildModule,processModuleDependencies,summarizeDependencies,createModuleAssets,createHash等等。


- 主要的成员

参考源码：

```javascript 
        this.compiler = compiler;       //Compiler对象的引用
        this.resolvers = compiler.resolvers;   //模块解析器
        this.inputFileSystem = compiler.inputFileSystem;
        
        var options = this.options = compiler.options;
        this.outputOptions = options && options.output;
        this.bail = options && options.bail;
        this.profile = options && options.profile;
        
        this.mainTemplate = new MainTemplate(this.outputOptions);   //这里Template是用来生成js结果文件的。
        this.chunkTemplate = new ChunkTemplate(this.outputOptions, this.mainTemplate);
        this.hotUpdateChunkTemplate = new HotUpdateChunkTemplate(this.outputOptions);
        this.moduleTemplate = new ModuleTemplate(this.outputOptions);
        
        this.entries = [];              //入口
        this.preparedChunks = [];        //预先加载的chunk
        this.chunks = [];                                //所有的chunk
        this.namedChunks = {};                        //每个都对应一个名子，可以通过namedChunks[name]获取chunk
        this.modules = [];              //所有module
        this._modules = {};
        this.cache = null;
        this.records = null;
        this.nextFreeModuleId = 0;
        this.nextFreeChunkId = 0;
        this.nextFreeModuleIndex = 0;
        this.nextFreeModuleIndex2 = 0;
        this.additionalChunkAssets = [];
        this.assets = {};                                //保存所有生成的文件
        this.errors = [];
        this.warnings = [];
        this.children = [];            // 保存子Compilation对象，子Compilation对象依赖它的上级Compilation对象生成的结果，所以要等父Compilation编译完成才能开始。
        this.dependencyFactories = new ArrayMap();   //保存Dependency和ModuleFactory的对应关系，方便创建该依赖对应的Module
        this.dependencyTemplates = new ArrayMap();   //保存Dependency和Template对应关系，方便生成加载此模块的代码
```

- 重要方法

1. addEntry

2. buildModule

3. _addModuleChain