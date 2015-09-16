define(['avalon','jquery','easyui','wrapper'],function(avalon,jquery,easyui,wrapper){
	wrapper.wrap('datagrid', "<table></table>",function(vm,el){
		$(el).datagrid(vm.wrapperOptions);
 	});

 var model = avalon.define({
                $id: "menuView",
                module : {
                	contentSrc:"",
                	contentInit:function(){}   //模块view加载完成后的回调方法，在刷新（F5）时可能调用两次
                },   //当前的内容模块
                contentSrc:"app/module/menuView/default.html",
                loadMenuMod:function(path){ //根据菜单获取view和对应的业务代码
                	if('/31' === path){
                		return {
                			contentSrc : 'app/module/menuView/31.html',
                			contentInit : function(){
                				avalon.log('app/module/menuView/31.html')
                			}
                		};
                	}

               		 if('/32' === path){
                		return {
                			contentSrc : 'app/module/menuView/32.html',
                			contentInit : function(){
                				var wrapperOptions ={
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
									{adviceid:'value11', consulter:'value12',content:'value3',replynumber:'value4'},{adviceid:'value11', consulter:'value12',content:'value3',replynumber:'value4'}
								]
							} ;

                				$('#32').datagrid(wrapperOptions);
                				avalon.log('app/module/menuView/32.html')
                			}
                		};
               		 }

               		 if('/33' === path){
                		return {
                			contentSrc : 'app/module/menuView/33.html',
                			contentInit : function(){
                				avalon.log('app/module/menuView/33.html')
                			}
                		};
               		 }
                	var tmp =  {
                		 	 contentSrc : 'app/module/menuView/default.html' ,
                		  contentInit:function(){ }
                		}
                	return tmp
                	
                		

                },
				loadView:function(path){
					var mod =  model.loadMenuMod(path);
					model.module = mod;
					model.contentSrc  = mod.contentSrc;
				},
				$datagridopt : {
					 wrapperOptions:{
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
							}
				 },
				 render : function(){
				 	model.module.contentInit();
				 },
				 loadData:function(){
					tmp = [];
					avalon.each([1,2,3,4,5,6,7,8,9,0,10],function(index,item){
						row = {adviceid:'adviceid-'+Math.ceil(Math.random()*1000),
						consulter:'consulter-'+Math.ceil(Math.random()*1000),
						content:'content-'+Math.ceil(Math.random()*1000),
						replynumber:'replynumber-'+Math.ceil(Math.random()*1000)};
						tmp.push(row);
					});
					$('#32').datagrid('loadData',tmp);
					$(avalon.vmodels.test.element).datagrid('loadData',tmp);
				 }

            });
 return model;
});