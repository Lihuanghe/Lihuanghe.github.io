---
layout: post
title: '服务器升级openssl后,bitnami-gitlab服务报错解决'
description: "openssl, gitlab,git,动态库"
category: gitlab
tags: [gitlab,git]
---
{% include JB/setup %}

问题原因： bitnami-gitlab安装时，会设置git用户的LD_LIBRARY_PATH，默认都使用安装包里的动态库。但是操作系统的ssl仍然使用的是/usr/lib下的动态库。所以gitlab不会报错，但是当用户添加ssh-key到gitlab上时，
则会调用到系统的动态库，此时因为动态库版本不一样导致profile/keys/create失败。我的系统是因为libcrypto.so.1.0.0这个库版本不对。

解决办法： 统一使用操作系统的ssl动态库。需要重新编译git，链接系统的库。
1. 下载git源代码后，重新编译。
2. 把gitlab/git/bin/.origin下的可执行文件 用新编译的git执行文件覆盖。
3. 把系统的动态库copy到gitlab/common/lib下。
