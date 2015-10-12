---
layout: post
title: 'Netty5的启动说明，帮助理解netty5对NIO的封装'
description: "netty5, NIO,SocketChannel"
category: netty
tags: [netty,NIO,SocketChannel]
---
{% include JB/setup %}

Netty5: ServerSocketChannel启动说明： 以NettyExample 里EchoServer为例

```java
	//EventLoop相当于线程，会在run()方法里不断的执行Selector.select(timeout)方法
	//如果有就绪的事件，就创建一个处理对应事件的任务丢进线程池里执行。

	//下边EventLoopGroup就是线程池。
        EventLoopGroup bossGroup = new NioEventLoopGroup(1);
        EventLoopGroup workerGroup = new NioEventLoopGroup();  //这里默认创建 cpu个数 * 2 个线程
        try {
            ServerBootstrap b = new ServerBootstrap();
            b.group(bossGroup, workerGroup)
             .channel(NioServerSocketChannel.class)
             .option(ChannelOption.SO_BACKLOG, 100)
             .handler(new LoggingHandler(LogLevel.INFO))
             .childHandler(new ChannelInitializer<SocketChannel>() {
                 @Override
                 public void initChannel(SocketChannel ch) throws Exception {
                     ChannelPipeline p = ch.pipeline();
                     if (sslCtx != null) {
                         p.addLast(sslCtx.newHandler(ch.alloc()));
                     }
                     //p.addLast(new LoggingHandler(LogLevel.INFO));
                     p.addLast(new EchoServerHandler());
                 }
             });

            // 以上都是设置参数和ChannelHandler ，下面调用bind()才是启动服务器.
	    // 相当于原生NIO调用
	    // ServerSocketChannel servch = ServerSocketChannel.open();
	    // servch.configureBlocking(false);
	    // selectKey = servch.register(selector , 0, null);  
	    // serverSocketChannel.bind();
 	    // selectKey.interestOps(SelectionKey.OP_ACCEPT);
	    // 因为Event是注册到bossGroup里的seletor上的，所以后边bossGroup就能不断的处理Accept事件了。

	    //Start the server.
            ChannelFuture f = b.bind(PORT).sync();

            // Wait until the server socket is closed.
            f.channel().closeFuture().sync();
```

那么Netty又是怎么处理Accept事件呢，看代码：ServerBootstrap 里有个ChannelHandler `ServerBootstrapAcceptor` 专门处理Accept事件.
来看看ServerBootstrapAcceptor的ChannelRead()方法是怎么处理的

```java
        public void channelRead(ChannelHandlerContext ctx, Object msg) {
	    
	   // 由于NioServerSocketChannel是AbstractNioMessageChannel的子类，
	   // 当有Accept事件就绪时就会调用AbstractNioMessageChannel.NioMessageUnsafe.read()方法，
	   // unSafe.read()里再调用NioServerSocketChannel.doReadMessages()方法，实现对serverSocketChannel.accept()的调用，完成三次握手，
	   // 并触发PipeLine的channelRead()方法，所以这里的参数msg是serverSocketChannel.accept()的返回结果: SocketChannel的封装类：NioSocketChannel

            final Channel child = (Channel) msg;

            child.pipeline().addLast(childHandler);

            for (Entry<ChannelOption<?>, Object> e: childOptions) {
                try {
                    if (!child.config().setOption((ChannelOption<Object>) e.getKey(), e.getValue())) {
                        logger.warn("Unknown channel option: " + e);
                    }
                } catch (Throwable t) {
                    logger.warn("Failed to set a channel option: " + child, t);
                }
            }

            for (Entry<AttributeKey<?>, Object> e: childAttrs) {
                child.attr((AttributeKey<Object>) e.getKey()).set(e.getValue());
            }

	    // 这里是注册childChannel的READ事件到workGroup线程池里，让Selector 处理这个连接的Read事件。
	    // 这样当有数据到达时，childGroup线程调用selector.select()方法会返回，并调用unSafe.read()方法。
	    // 最终会调用NioSocketChannel.doReadBytes()方法，完成数据读取,再触发PipeLine的channelRead()方法，跟Accep事件的处理一样的。
	    // 只是传给ChannelRead()方法的参数是Bytebuf.   
            try {
                childGroup.register(child).addListener(new ChannelFutureListener() {
                    @Override
                    public void operationComplete(ChannelFuture future) throws Exception {
                        if (!future.isSuccess()) {
                            forceClose(child, future.cause());
                        }
                    }
                });
            } catch (Throwable t) {
                forceClose(child, t);
            }
        }

```

上面介绍了Netty作为服务端处理Accept 和 Read. 下面看看是如何处理Connect的。 同样从EchoClient来看。

```java
	    // 前边都不说了，跟Server差不多，从这句开始是真正开始建立连接。相当于原生NIO代码的：
	    // SocketChannel clich = SocketChannel.open();
	    // clich.configureBlocking(false);
	    // selectKey = clich.register(selector , 0, null);  
	    // boolean connected = clich.connect(remoteAddress);
 	    // selectKey.interestOps(SelectionKey.OP_CONNECT);
	    // 当服务端accept之后，workGroup就会处理Connect事件了。并调用unsafe.finishConnect()方法完成三次握手。
	    // 之后处理READ事件。
            // Start the client.

            ChannelFuture f = b.connect(HOST, PORT).sync();
```
