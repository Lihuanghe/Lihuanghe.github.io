---
layout: post
title: '一个webpack配置例子'
description: "webpack配置例子"
category: webpack
tags: [webpack ]
theme :
  name : twitter
---
{% include JB/setup %}

这是一个webpack打包的配置文件例子，已在在线公司生产上使用。代码是 avalon + webpack的单页应用。

```javascript
/**
 * Created by Lihuanghe on 16/4/21.
 */
var path = require('path');
var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin'); 
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //将组件中的样式乖乖提取出来
var HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板插入代码

//webpck插件
var plugins = [
  new HtmlWebpackPlugin({
    title: "智能短信平台",
    inject:false,
    favicon:'./favicon.ico',
    template: "./app/index.template",
    filename: "index.html",
    xhtml:true,
    hash: false
  }),
   //将样式统一发布到style.css中
  new ExtractTextPlugin("[name].[contenthash:8].css", {
    allChunks: true,
    disable: false
  }),
  // 使用 ProvidePlugin 加载使用率高的依赖库
  new webpack.ProvidePlugin({
    $: 'jquery',
     jQuery: "jquery",
    "window.jQuery": "jquery",
    chart:'chart_ref',
    WdatePicker:'datepiker'
  }),
  //copy 插件
  new CopyWebpackPlugin([
      {from:'./app/assets/lib/datepiker/'},
      {from:'./app/assets/lib/keditor/'}
    ])
];

var entry = {
        entry: './app/entry.js'
    };
var   buildPath = "./release";

//编译输出路径
module.exports = {
  entry: entry,
  output: {
    path: buildPath,
    filename: 'build.[chunkhash:8].js',
    publicPath: '/ssp/',
    chunkFilename: "[name].chunk.[chunkhash:8].js" 
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        "style-loader", "css-loader?sourceMap!cssnext-loader")
    }, {
      test: /\.(jpg|png|gif)$/,
      loader: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    },{
      test: /\.swf$/,
      loader: "file-loader"
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
        test: /\.js$/,
        exclude:/assets[\\\/]lib/,
        loader: 'strict'
      },
       {
      test: /\.(html|tpl)$/,
      exclude:/doublelist/,     //OniUI的不能使用html-loader加载
      //把所有html里的script标签过滤掉
      loader: 'string-replace?{multiple:[{search:"<\s*script[^>]*>.*<\s*/\s*script\s*>",replace:"<script> /* html里不能写js代码,源代码已被删除 */ </script>",flags:"gi"}]}!html?minimize=false'
    }
     ]
  },

  resolve: {
    root: path.resolve('./app'),
    // require时省略的扩展名，如：require('module') 不需要module.js
    extension: ['', '.js', '.css'],
    //别名
    alias: {
      'main' : 'js/main',
    // style : 'assets/lib/css.min',
    'avalon' : 'assets/lib/avalon/avalon.shim',
    'jquery' : 'assets/lib/jquery/jquery',
    'base64' : 'assets/lib/base64/jquery.base64',
    'mmRouter': 'assets/lib/mmRouter-0.5/mmRouter',
    'mmHistory':'assets/lib/mmRouter-0.5/mmHistory',
    'easyui' : 'assets/lib/easyui/jquery.easyui.min',
    'loading' :'assets/lib/jquery/loading/loading-overlay.min',
    'pagination':'assets/lib/pagination/1.2.1/jquery.pagination',
    'blockUI' : 'assets/lib/blockUI/2.64/jquery.blockUI.min',
    'artDialog' : 'assets/lib/dialog/6.0.4/dialog',
    'dialog' : 'assets/common/dialog_amd',
    'wrapper' : 'assets/common/avalonJQcomponent',
    'gloMap':'assets/common/glo_Map',
    'ztree':'assets/lib/ztree/jquery.ztree.core-3.5',
    'ztreecheck':'assets/lib/ztree/jquery.ztree.excheck-3.5',
    'map' :'assets/common/map',
    'sessionMap':'assets/common/sessionMap',
    'ajax' : 'assets/common/ajax_amd',
    'upload':'assets/lib/uploadify/ajaxfileupload',
    'treetable':'assets/lib/treetable/jquery.treetable',
    'svMap' : 'assets/common/svConfig',
    'pager' : 'assets/common/pager_amd',
     'global_ref' : 'assets/common/global',
     'chart_ref':'assets/lib/chart',
    'datepiker' : 'assets/lib/datepiker/WdatePicker',
    'kindeditor' : 'assets/lib/keditor/kindeditor-min'
    }
  },
  plugins: plugins,
  devtool: 'source-map'
};
```