---
layout: post
title: '将一个正整数组分成N组,使每组的数字之和相近. '
description: "算法, algorithm"
category: algorithm
tags: [algorithm]
---
{% include JB/setup %}

      QQ群里有人发了个面试问题: `将一个正整数组分成3组,使每组的数字之和相近.`
闲得没事,写了个算法的[demo链接](http://lihuanghe.github.io/avalontest/#!/35).
其实这个题可以等同于: 将一个正整数组分成N组,使每组的数字之和等于平均数.
因为数组的总和是固定的,所以可以计算每组的和应该等于 Sum/N . 那么这道题就变成:
`在一个数组内找出一组数,使其和等于M`. 

总体思想就是: 数组按从大到小排序,然后从第一个数开始,一个个试直到有一组数的sum符合要求.


详情看代码:

```javascript
	function aaa(arr,sum){
		var oldsum = sum;
		var i=0; 		//用来记录当前正在处理的数字下标
		var ret = []; //保存返回结果的数组
		while(true){

			if(sum == 0) break; //sum为0表示找到了符合规则的数组子集了
			
			//因为已用过的数字要从数组删除掉,所以要跳过undefined 
			if(arr[i] === undefined && i<arr.length){
				i++;
				continue;
			}

			
			if(i == arr.length){
				//已是最后一个数了
				//从结果数组里弹出一个数, 用这此数的下一个数据进行测试
				var t = ret.pop();
				if(t){
					sum += arr[t];
					i = t+1;
					continue;
				}else{
					//结果集合内没有数字了,说明已尝试了所有数字
					break;
				}
						
			}

			if(sum > 0){
				//如果加上下一个数仍然小于sum,则把下一个数加入结果集,否则尝试更小的数
				if(sum - arr[i] >= 0){

					sum -= arr[i];
					ret.push(i++);
				
				}else{
				
					i++;
				}
			}
		}

		//所有可能都试过了.找到结果了就返回.
		if(sum == 0) {
			var result = [];
			var sum = 0;
			for(j in ret){
				result.push(arr[ret[j]]);
				sum += arr[ret[j]];
				delete arr[ret[j]] ;
			}
			return {"result":result,"sum":sum};
		}else{
		//还没找到结果,试试看有没有更接近的结果 : 即数组之和是sum-1的.
			if(oldsum - 1 > 0){
				return aaa(arr,oldsum-1);
			}else{
				return ;
			}
			
		}
	};
```