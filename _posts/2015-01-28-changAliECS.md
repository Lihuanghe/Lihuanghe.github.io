---
layout: post
title: "avalon与socket.io，搭建聊天系统"
description: ""
category: [MVVM] 
tags: [avalon ,socket.io]
---
{% include JB/setup %}

    用socket.io做websocket应用真爽。服务端用消息中间件做个转发。一个多人一对一聊天系统，从头开发的话，估计不超过10人天。
    搭配mvvm ，avalon只需设计前端数据结构，和一个事件订阅发布机制，就能实现一对多的聊天。

1. [avalong+socket.io](https://github.com/Lihuanghe/socketioChat)
