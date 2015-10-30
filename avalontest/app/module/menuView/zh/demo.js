define(['config','text!app/module/menuView/zh/demo.html'],
	function(config,viewHTML){

	var GetRandomNum = function (Min,Max)
	{   
		var Range = Max - Min;   
		var Rand = Math.random();   
		return (Min + Math.round(Rand * Range));   
	}   

	var createoriginArr = function (size){
		var t = [];
		var sum = 0;
		for(; size-- > 0;){
			var num = GetRandomNum(1,100);
			sum += num;
			t.push(num);
		}
		model.avg = sum/3;
		return t.sort(function(a,b){return a<b?1:-1});
	}

	/*从数组内选择出一组数使其和为sum*/
	function aaa(arr,sum){
		var oldsum = sum;
		var i=0; 
		var ret = [];
		while(true){

			if(sum == 0) break;
			if(i == arr.length) break;
			if(arr[i] === undefined){
				i++;
				continue;
			}
			if(sum > 0){
				if(sum - arr[i] >= 0){

					sum -= arr[i];
					ret.push(i++);
				
				}else{

					if(i+1 == arr.length){
						//已是最后一个数了
						//退回一个数
						var t = ret.pop();
						if(t){
							sum += arr[t];
							i = t+1;
						}else{
							//结果集合内没有数字了
							break;
						}
						
					}else{
						i++;
					}
					
				}
			}
		}

		if(sum == 0) {
			var result = [];
			for(j in ret){
				result.push(arr[ret[j]]);
				delete arr[ret[j]] ;
			}
			return result;
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
                		return ret.join(' , ') + '=>'+ sum ;
                	};

	var model = avalon.define({
                $id: "vmdemo",
                run: function(){
                	
                	var origin = createoriginArr(model.size)
                	model.origin = myjoin(origin);

                	var arr1 = aaa(origin , Math.round(model.avg));
                	model.arr1 = (arr1 === undefined ? "undefined" : myjoin(arr1));
                	
					var arr2 = aaa(origin , Math.round(model.avg));
                	model.arr2 = (arr2 === undefined ? "undefined" : myjoin(arr2) );
					
                	model.arr3 = myjoin(origin);
                	
                	model.totalarr =myjoin(origin.concat(arr1).concat(arr2).sort(function(a,b){return a<b?1:-1}));

                },
                avg:0,
                size:10,
                origin:"",
                arr1:"",
                arr2:"",
                arr3:"",
                totalarr:""
      });


// 定义视图模块
	var viewmod =  {
	    viewtSrc:viewHTML ,
		viewInit:function(){},   //模块view加载完成后的回调方法，在刷新（F5）时可能调用两次
		viewDestroy:function(){} //切换菜单时销毁原来的view
	 };
	 return viewmod;
});