---
layout: post
title: "logstash时区差问题"
description: ""
category: [logstash] 
tags: [logstash ,ruby]
---
{% include JB/setup %}

logstash-1.4.2在使用时，因为时区问题，timestamp字段总是差8小时。导致输入文件，或者装入elasticsearch时间不对。
修改源码：

```ruby
#修改logstash/lib/logstash/event.rb 可以解决这个问题
#第226行
	.withZone(org.joda.time.DateTimeZone::UTC)
#修改为
	.withZone(org.joda.time.DateTimeZone.getDefault())
```

同时，在使用date这个filters修改@timestamp字段时，target字段的时间也有时差问题。
修改源码：

```ruby
#修改/lib/logstash/filters/date.rb 可以解决这个问题
#第209行
          event[@target] = Time.at(epochmillis / 1000, (epochmillis % 1000) * 1000).utc
#修改为
          event[@target] = Time.at(epochmillis / 1000, (epochmillis % 1000) * 1000).getlocal
```



