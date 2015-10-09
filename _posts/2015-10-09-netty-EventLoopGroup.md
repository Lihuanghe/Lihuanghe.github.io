---
layout: post
title: 'Netty5中EventLoopGroup中submit与jdk中ExecutorService的不同之处'
description: "netty5, EventLoop,Executor"
category: netty
tags: [netty,Executor]
---
{% include JB/setup %}

Netty5中EventLoopGroup实现了ScheduledExecutorService接口，因此在业务代码中使用netty的EventLoopGroup代替JDK中自带的线程池,但发现任务总不定期的出现阻塞。
分析netty5的源代码，发现EventLoopGroup的实现都基于MultithreadEventExecutorGroup来实现的。而MultithreadEventExecutorGroup又是通过调用`protected abstract EventExecutor newChild(Executor executor, Object... args) throws Exception;` 来生成EventLoop实现类。
但是在netty5中EventLoop的实现都是基于SingleThreadEventLoop来实现的，因为SingleThreadEventLoop中newTaskQueue是new出来独立的任务队列，由于不共享任务队列，即使EventLoopGroup有多个空闲线程，被阻塞任务占用的EventLoop不会继续处理队列中其余的任务，任务也无法被其它的线程获取，造成任务不执行。

```java
	SingleThreadEventLoop....
	
	protected Queue<Runnable> newTaskQueue() {
	return new LinkedBlockingQueue<Runnable>();
}
```
解决办法：
	注意如果有阻塞任务不能使用EventLoopGroup，但是由于EventLoopGroup提供的io.netty.util.concurrent.Future比JDK的好用(有addListener()方法)，所以找了Guava18.0里的ListeningScheduledExecutorService类来代替EventLoopGroup.
·private final static ListeningScheduledExecutorService busiWork = MoreExecutors.listeningDecorator(new ScheduledThreadPoolExecutor(10,new DefaultThreadFactory("busiWork-")));·

比如实现了方法：

```java
	/**
	 *使用netty线程池实现一个无限循环任务，
	 *@param task
	 *需要执行的任务
	 *@param exitCondition
	 *任务的关闭条件
	 *@param delay
	 *任务的执行间隔
	 */
	public void submitUnlimitCircleTask(Callable<?> task,ExitUnlimitCirclePolicy exitCondition,long delay){
		addtask(busiWork,task,exitCondition,delay);
	}
	
	private void addtask(final ListeningScheduledExecutorService executor ,final Callable<?> task ,final ExitUnlimitCirclePolicy exitCondition,final long delay) {
	
	
		final ListenableScheduledFuture<?> future = executor.schedule(task, delay, TimeUnit.MILLISECONDS);
		future.addListener(new Runnable(){

			@Override
			public void run() {
				
				DefaultPromise nettyfuture = new DefaultPromise(GlobalEventExecutor.INSTANCE);
				
				try {
					nettyfuture.setSuccess(future.get());
				} catch (InterruptedException e) {
					nettyfuture.setFailure(e);
				} catch (ExecutionException e) {
					nettyfuture.setFailure(e);
				}
				
				if(exitCondition.notOver(nettyfuture))			
					addtask(executor,task ,exitCondition,delay);
			}
			
		}, executor);
	}
```
