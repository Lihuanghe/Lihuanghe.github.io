define(['config','wrapper','easyui','text!app/module/menuView/easyLayout/demo.html',
	'text!app/module/menuView/easyLayout/east.html',
	'text!app/module/menuView/easyLayout/west.html',
	'text!app/module/menuView/easyLayout/south.html',
	'text!app/module/menuView/easyLayout/north.html',
	'text!app/module/menuView/easyLayout/center.html'],
	function(config,wrapper,easyui,viewHTML,eastHTML,westHTML,southHTML,northHTML,centerHTML){
	  var model = avalon.define({
                $id: "easyUIlayout",
                layout:{east:{show:true,content:eastHTML,options:"region:'east',split:true"},
                       south:{show:true,content:southHTML,options:"region:'south',split:true,title:'south Title'"},
                       north:{show:true,content:northHTML,options:"region:'north',title:'north Title'"},
                       west:{show:true,content:westHTML,options:"region:'west',split:true,title:'west Title'"},
                       center:{show:true,content:centerHTML,options:"region:'center',title:'Main Title',iconCls:'icon-ok'"}
                   },
                $removedpanel:{},
                showpanel:function(region){
                	var oldshow =model.layout[region].show;
                	
                	if(oldshow){
                		//save panel options
                		model.$removedpanel[region] = $('#layout').layout('panel',region).panel('options');
                		
                		$('#layout').layout('remove',region);
                	}
                	else{

                		
                		var options = model.$removedpanel[region]||model.layout[region].options;
                		options.content = model.layout[region].content

                		avalon.log(options)

                		$('#layout').layout('add',options);
                		
                	}
                	model.layout[region].show = !oldshow;	
                }
    });

// 定义视图模块
	var viewmod =  {
	    viewtSrc:viewHTML ,
		viewInit:function(){
			$.parser.parse();
		},   //模块view加载完成后的回调方法，在刷新（F5）时可能调用两次
		viewDestroy:function(){} //切换菜单时销毁原来的view
	 };
	 return viewmod;
});