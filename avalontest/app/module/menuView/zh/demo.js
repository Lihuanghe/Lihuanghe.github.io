define(['config','text!app/module/menuView/zh/demo.html','jstat'],
	function(config,viewHTML,jStat){
	var jStat = jStat.jStat;
	console.log(jStat);
	var GetRandomNum = function (Min,Max)
	{   
		var Range = Max - Min;   
		var Rand = Math.random();   
		return (Min + Math.round(Rand * Range));   
	}   

	var createoriginArr = function (size){
		var t = [];
		var sum = 0;
		for(var i=0; i < size; i++){
			var num = GetRandomNum(3,1000);
			sum += num;
			t.push(num);
		}
		model.avg = sum/model.cnt;
		return t.sort(function(a,b){return a<b?1:-1});
	}

	/*从数组内选择出一组数使其和为sum*/
	function aaa(arr,sum){
		var oldsum = sum;
		var i=0; 
		var ret = [];
		while(true){

			if(sum == 0) break;
			
			if(arr[i] === undefined && i<arr.length){
				i++;
				continue;
			}

			if(i == arr.length){
				//已是最后一个数了
				//退回一个数
				var t = ret.pop();
				if(t){
					sum += arr[t];
					i = t+1;
					continue;
				}else{
					//结果集合内没有数字了
					break;
				}
						
			}

			if(sum > 0){
				if(sum - arr[i] >= 0){

					sum -= arr[i];
					ret.push(i++);
				
				}else{
					i++;
				}
			}
		}

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
			if(oldsum - 1 > 0){
				return aaa(arr,oldsum-1);
			}else{
				return ;
			}
			
		}
	};

	var myjoin = function(arr){
                		var ret = [];
                		var sum = 0;
                		for(j in arr){
                			if(arr[j] === undefined)
                				continue;
                			sum += arr[j];
                			ret.push(arr[j]);
                		}
                		return {"str":ret.join(' , ') + '=>'+ sum ,"sum":sum} ;
                	};

	var model = avalon.define({
                $id: "vmdemo",
                run: function(){
                	
                	var origin = createoriginArr(model.size)
                	model.origin = myjoin(origin).str;
                	var avg = model.avg;
                	if(Math.ceil(model.avg) != model.avg ){
                		//平均数向上取整
                		avg =  Math.ceil(model.avg) 
                	}
                	var result = [];
                	var assertarr = [];
                	var t_deviation = 0; //保存误差
                	var sumArr = [];
                	for(var i = 0; i< model.cnt-1 ; i++){
                		var arr = aaa(origin ,avg + Math.round(t_deviation));
                		if(arr != undefined){
                			t_deviation += ( model.avg  - arr.sum );
                			assertarr = assertarr.concat(arr.result);
 							result.push( myjoin(arr.result).str);
 							sumArr.push(arr.sum)
                		}else{
                			result.push( "undefined");
                			sumArr.push(0)
                		}

                	}
                	
                	//剩下的是最后一组
                	var lastarr =  myjoin(origin);
                	result.push(lastarr.str);

                	sumArr.push(lastarr.sum)

                	model.result = result;
                	model.totalarr = myjoin((origin.concat(assertarr)).sort(function(a,b){return a<b?1:-1})).str;
                	model.variance = jStat.variance(sumArr,true);
                },
                avg:0,
                size:60,
                cnt:3,
                origin:"",
                result:[],
                totalarr:"",
                variance:0
      });


// 定义视图模块
	var viewmod =  {
	    viewtSrc:viewHTML ,
		viewInit:function(){},   //模块view加载完成后的回调方法，在刷新（F5）时可能调用两次
		viewDestroy:function(){} //切换菜单时销毁原来的view
	 };
	 return viewmod;
});