---
layout: post
title: '遇到一个jdk建立SSL连接时的坑：Reverse DNS lookup during SSL handshake'
description: "jdkbug SSL "
category: jdkbug
tags: [jdkbug ]
theme :
  name : twitter
---
{% include JB/setup %}

为了解决公司内部没有域名服务器时的http跨机房调用服务的问题： 服务部署在多个机房，有多个服务ip.由于没有内部的智能dns，所有业务使用httpclient时不能很方便的切换服务IP.

因此开发了[CustomizeDNSHttpClient](https://github.com/Lihuanghe/CustomizeDNSHttpClient). 但是在调用https服务时却遇到了问题：
在windows上，程序会挂起10s左右。下面详细分析下这个问题。

# 问题现象：

    当使用域名，如 https://www.baidu.com 调用时速度很快。但当使用IP地址时 ，https://192.168.100.60:20030 程序会挂起10s左右。

# 问题分析：
  
    程序最终调用jdk的代码是：

```java
    //SocketFactory类的：public abstract Socket createSocket(InetAddress paramInetAddress1, int paramInt1, InetAddress paramInetAddress2, int paramInt2) throws IOException;

     SocketFactory socketfactory = getSSLContext().getSocketFactory();

     ......
     //ip[i] 是Inet4Address类型
     Socket socket =  socketfactory.createSocket(ip[i],port,localAddress,localPort);

```

发现使用域名调用和直接使用IP调用的不同在于： `ip[i]` 对象中的holder的getHostName返回值不同。（直接使用IP时holder().getHostName() ==  null）

InetAddress的getHostName会间接调用InetAddress.getHostFromNameService进行域名反解析，正是这一步很耗时。最终结果也正是这一步耗时严重。

```java
    String getHostName(boolean check) {
        if (holder().getHostName() == null) {
            holder().hostName = InetAddress.getHostFromNameService(this, check);
        }
        return holder().getHostName();
    }
```

那`SSLSocketImpl`又是什么时候调用 这个耗时的方法的呢？
通过 [http://mail-archives.apache.org/mod_mbox/jmeter-dev/201408.mbox/%3CCAH9fUpaW35vJXPAdRHpb7EHP_B=3Aeo-N+EGM01pqLuJTqzWmQ@mail.gmail.com%3E](http://mail-archives.apache.org/mod_mbox/jmeter-dev/201408.mbox/%3CCAH9fUpaW35vJXPAdRHpb7EHP_B=3Aeo-N+EGM01pqLuJTqzWmQ@mail.gmail.com%3E) 
可以看到调用栈： 

```java
 "Thread Group 1-1" prio=6 tid=0x038f3c00 nid=0xd80 runnable [0x03b7f000]
    java.lang.Thread.State: RUNNABLE
         at java.net.Inet4AddressImpl.getHostByAddr(Native Method)
         at java.net.InetAddress$1.getHostByAddr(Unknown Source)
         at java.net.InetAddress.getHostFromNameService(Unknown Source)
         at java.net.InetAddress.getHostName(Unknown Source)
         at java.net.InetAddress.getHostName(Unknown Source)
         at sun.security.ssl.SSLSocketImpl.getHost(Unknown Source)
         - locked <0x1349be48> (a sun.security.ssl.SSLSocketImpl)
         at sun.security.ssl.Handshaker.getHostSE(Unknown Source)
         at sun.security.ssl.ClientHandshaker.getKickstartMessage(UnknownSource)
         at sun.security.ssl.Handshaker.kickstart(Unknown Source)
         at sun.security.ssl.SSLSocketImpl.kickstartHandshake(UnknownSource)
         - locked <0x1349be48> (a sun.security.ssl.SSLSocketImpl)
         at sun.security.ssl.SSLSocketImpl.performInitialHandshake(UnknownSource)
         - locked <0x1349c038> (a java.lang.Object)
         at sun.security.ssl.SSLSocketImpl.startHandshake(Unknown Source)
         at sun.security.ssl.SSLSocketImpl.getSession(Unknown Source)
         at org.apache.http.conn.ssl.AbstractVerifier.verify(AbstractVerifier.java:91)
         at org.apache.http.conn.ssl.SSLSocketFactory.connectSocket(SSLSocketFactory.java:572)
         at org.apache.http.impl.conn.DefaultClientConnectionOperator.openConnection(DefaultClientConnectionOperator.java:180)
```

至此：找到原因，解析办法很简单，保证传给`createSocket`的方法的`InetAddress`对象的host不为空就好。并且当使用`InetAddress`时，慎重使用`getHostName`方法。

相关参考：google 下： ` Reverse DNS lookup during SSL handshake `能搜到很多
如：
[http://stackoverflow.com/questions/3193936/how-to-disable-javas-ssl-reverse-dns-lookup](http://stackoverflow.com/questions/3193936/how-to-disable-javas-ssl-reverse-dns-lookup)
