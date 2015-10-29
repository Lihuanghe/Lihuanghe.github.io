define(['config','easyui','text!app/module/menuView/demo/demo.html','wrapper'],function(config,easyui,viewHTML,wrapper){
	var wrapperOptions = {
								width: 'auto',  
								height:300,               
								striped: true,  
								singleSelect : true,  
								//queryParams:{},  	
								loadMsg:'数据加载中请稍后……',  
								pagination: true,  
								rownumbers: true,     
								columns:[[  
									{field:'adviceid',title: '来文号',align: 'center',width: 100},  
									{field:'consulter',title: '案由',align: 'center',width: 100,  
										//添加超级链，并将来文号作为参数传入  
										formatter:function(val,rec){  
											//alert(rec.adviceid);  
											return "<a href='jsp/proposal/psconsultview.jsp?id="+rec.adviceid+"'>"+val+"</a>";  
									   }  
									},  
									{field:'content',title: '状态',align: 'center',width: 100},  
									{field:'replynumber',title: '回复数',align: 'center',width:100}                                                          
								]],
								data: [
									{adviceid:'value11', consulter:'value12',content:'value3',replynumber:'value4'},{adviceid:'value11', consulter:'value12',content:'value3',replynumber:'value4'},
									{adviceid:'value11', consulter:'value12',content:'value3',replynumber:'value4'},{adviceid:'value11', consulter:'value12',content:'value3',replynumber:'value4'},
									{adviceid:'value11', consulter:'value12',content:'value3',replynumber:'value4'},{adviceid:'value11', consulter:'value12',content:'value3',replynumber:'value4'}
								]
						};
	wrapper.wrap('datagrid', "<table></table>",function(vm,el){
		$(el).datagrid(vm.$model.wrapperOptions);
 	});

	var model = avalon.define({
                $id: "demoView",
                path : "",
                wrapperOptions:{"wrapperOptions":wrapperOptions},
                loadData:function(){
					tmp = [];
					avalon.each([1,2,3,4,5,6,7,8,9,0,10],function(index,item){
						row = {adviceid:'adviceid-'+Math.ceil(Math.random()*1000),
						consulter:'consulter-'+Math.ceil(Math.random()*1000),
						content:'content-'+Math.ceil(Math.random()*1000),
						replynumber:'replynumber-'+Math.ceil(Math.random()*1000)};
						tmp.push(row);
					});
					$(avalon.vmodels.test.$DOMelement).datagrid('loadData',tmp);
				 }
      });

// 定义视图模块
	var viewmod =  {
	    viewtSrc:viewHTML ,
		viewInit:function(){},   //模块view加载完成后的回调方法，在刷新（F5）时可能调用两次
		viewDestroy:function(){} //切换菜单时销毁原来的view
	 };
	 return viewmod;
});