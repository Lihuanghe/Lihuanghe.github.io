---
layout: post
title: 'ss配合免费代理安全上网'
description: "shadowsocks  sockcap64 sandboxie"
category: shadowsocks
tags: [shadowsocks]
theme :
  name : twitter
---
{% include JB/setup %}


目前![image]( https://user-images.githubusercontent.com/7598107/33017437-49b81630-ce2d-11e7-9688-a76f476b7aa1.png) 还能够正常翻墙，所以就利用它将流量发出去。

1. 下载 ![image]( https://user-images.githubusercontent.com/7598107/33017437-49b81630-ce2d-11e7-9688-a76f476b7aa1.png ) . 下这个软件需要翻墙，[链接](https://goo.gl/paVsDz) 。

因为担心![image]( https://user-images.githubusercontent.com/7598107/33017437-49b81630-ce2d-11e7-9688-a76f476b7aa1.png) 的安全性，所以有必要做一些安全限制。一方面限制![image]( https://user-images.githubusercontent.com/7598107/33017437-49b81630-ce2d-11e7-9688-a76f476b7aa1.png) 修改操作系统文件，修改配置，甚至释放病毒。另一方面防止![image]( https://user-images.githubusercontent.com/7598107/33017437-49b81630-ce2d-11e7-9688-a76f476b7aa1.png) 截获流量，进而窃取隐私。

2. 下载沙盒 [“Sandboxie”](https://www.sandboxie.com/) ，下这个软件需要翻墙。

保证![image]( https://user-images.githubusercontent.com/7598107/33017437-49b81630-ce2d-11e7-9688-a76f476b7aa1.png) 在沙盒内部运行就可以限制它不能危害操作系统。

-----------

以上已经可以正常访问google了。下边需要购买专用VPN服务

3. ss(shadowsock)是之前很有名的翻墙工具，可以将流量加密后发送，但十X大后，ss流量已经被识别，大量ss服务IP被封挂掉了。但我们正好可以利用其加密流量的功能，借助![image]( https://user-images.githubusercontent.com/7598107/33017437-49b81630-ce2d-11e7-9688-a76f476b7aa1.png) 的通道让ss重新复活。

4.  ss本身支持前置代理，可以将加密后的流量发送给沙盒里的![image]( https://user-images.githubusercontent.com/7598107/33017437-49b81630-ce2d-11e7-9688-a76f476b7aa1.png) 。

前置代理配置如下：

![image](https://user-images.githubusercontent.com/7598107/36081683-244d42c0-0fdd-11e8-9eca-1de43711755d.png)

