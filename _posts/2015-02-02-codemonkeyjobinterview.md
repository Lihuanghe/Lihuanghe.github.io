---
layout: post
title: '收集一份程序员面试内容'
description: "job interview"
category: 
tags: []
---
{% include JB/setup %}

## 编程语言基础，语法，面向对象

1. private ,protected,public的访问权限？
2. try catch finally的使用？

```java 
	public Integer a()
	{
		int i = 1;
		try{
			i <<= 1;
			return i;
		}finally{
			i <<= 1;
			return i;
		}
	}
```

3. 如何重写/重载一个方法？
4. java反射有哪些适合的全用场景，或者说有哪些用法
5. java代理的使用场景
6. java 类加载顺序
7. 实现一个单例，且不允许有子类，该实现是否是线程安全的。

## 工作相关的常用第三方库及api ，svn,git
1. ArrayList , LinkList , TreeMap , HashMap , ConcurrentHashMap ,HashSet , Input/OutputStream , HttpClient , Arrays , IOUtils ......等等
2. 线程sleep/wait的区别，
3. Executors线程池
5. svn , git  命令

## 软件工程，评估代码量，质量如何度量，高内聚低耦合,
1. 你们的软件开发的流程
2. 你们怎么评估工作量和工期的
3. 你们怎么评价代码质量好坏，有什么工具可以使用
4. 客户/产品的一句话需求，你怎么办？
5. 设计一个高内聚低耦合的结构，从淘宝某一个/非常多个产品详情页面抓取产品价格，如果价格比我们系统低，就通知道我们相关负责人处理。

## 数据库，sql, 事务，索引，执行计划，
1. 事务ACID，事务隔离级别
2. 防止sql注入
3. 写一个sql，怎么创建索引，能让这个sql使用到索引
4. 如何优化慢sql
5. 数据库锁

## 计算机组成原理，操作系统 ，linux系统 ，网络IO,常用shell命令
1. linux基础操作命令
2. swap,虚拟内存，进程，线程，文件系统，线程上下文切换，进程地址空间，中断

## 网络7层模型，tcp/ip通信，http/https通信 ，web原理 ,
1. ip & mac 
2. tcp握手，time_wait,close_wait
3. http + ssl 
4. 无状态协议， 
2. LVS原理

## 数据结构，算法，最短路径，0/1背包问题
1. Array, List, Map , 排序，
2. 时间复杂度分析
3. ........

## 编译原理，正则表达式
1. 正则表达式
2. 词法分析, 语法分析
3. lex & yacc || ANTLR 
4. c/java 嵌入脚本，lua,javascript

## javascript , css , ajax , bootstrap , websocket , BIO, NIO ,容器tomcat ， servlet ,springMVC, ibatis\(ORM\)
1. js闭包 ， css position.......
2. ajax跨域 .jsonp ， websocket
3. BIO, NIO ,epoll .kqueue原理
4. tomcat.......
5. servlet
6. springMVC, WebRootContext , ServletContext, DispatcherServlet , HandlerMapping ,HandlerAdapter , ViewResolver , View


## 中间件：工作流引擎，消息中间件，规则引擎，搜索引擎，身份认证，缓存中间件，分布式一致性
1. 用过，知道哪些中间件。各是解决什么问题的。
2. 如何设计一个搜索引擎 , SSO 
3. 一致性Hash

## 高并发集群解决方案： dns ，lvs ,nginx , session集中化，避免单点
1. sleep & wait & Lock & Condition
2. 集群方案，原理

## 设计模式，服务化，避免rpc耦合，异步调用
1. 抽象工厂
2. 分布式一致问题， CAP 

## 技术选型
1. 设计架构，确定技术方案要考虑哪些因素。

<img alt="" src="/assets/images/1346772758_9859.jpg" />