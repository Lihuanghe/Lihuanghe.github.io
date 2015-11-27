define(['avalon','config','text!app/module/menuView/echarts/demo.html','echarts','jsonFormater','wrapper','jquery'],
    function(avalon,config,viewHTML,echarts,jsonFormater,wrapper,$){
	
    var wrapperOptions ={
                    tooltip: {
                        show: true
                    },
                    legend: {
                        data:['销量']
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            "name":"销量",
                            "type":"bar",
                            "data":[5, 20, 40, 10, 10, 20]
                        }
                    ]
                };
     wrapper.wrap('avabug', "<div style='height:400px;width:800px;background:red' />",function(vm,el){

    });

     wrapper.wrap('jsonformater', "<div />",function(vm,el){
            var jf = new jsonFormater({
                dom : el
            }); // 创建对象
            jf.doFormat(JSON.stringify(vm.$model.wrapperOptions)); // 格式化json
            
    });
     
     wrapper.wrap('echarts', "<div style='height:400px;width:800px;;;' /> ",
         function(vm,el){ //init
           var mychart = echarts.init(el); 
           mychart.setOption(vm.$model.wrapperOptions);
           vm.echartsIns = mychart;
        } ,
        function(vm,el){  //destroy
           vm.echartsIns.dispose();
           delete vm.echartsIns;
        } 
    );

   var model = avalon.define({
                $id: "baiduEcharts",
                wrapperOptions:{"wrapperOptions":wrapperOptions}
    });

// 定义视图模块
	var viewmod =  {
	    viewtSrc:viewHTML ,
		viewInit:function(){

        },   //模块view加载完成后的回调方法，在刷新（F5）时可能调用两次
		viewDestroy:function(){

        } //切换菜单时销毁原来的view
	 };


	 return viewmod;
});