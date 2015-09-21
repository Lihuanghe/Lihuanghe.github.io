define(['avalon','jquery',"mmRouter",'config',"app/module/menuView/menuView.js",'text!app/module/nav/contentNav.html'],function(avalon,jquery,mmRoute,config,menuView,contentHTML){

 var model = avalon.define({
                $id: "content-nav",
                content:contentHTML,
				menuData:[],
				curMenu:"",
				firstMenu:function(){
						
						var _this = $(this);
						if (_this.hasClass('open')) {
							if (_this.siblings('dl').find('dt').length) {
								_this.removeClass('open').find('.arrow').html('∧').end().siblings('dl').slideToggle('fast');
							}else{
								_this.removeClass('open').find('.arrow').html('∧').end().siblings('dl').show().find('dd').slideToggle('fast');
							}
						}else{
							if (_this.siblings('dl').find('dt').length) {
								_this.addClass('open').find('.arrow').html('∨').end().siblings('dl').slideToggle('fast');
							}else{
								_this.addClass('open').find('.arrow').html('∨').end().siblings('dl').show().find('dd').slideToggle('fast');
							}
						}
				},
				secondMenu:function(){
					var _this = $(this);
					if (_this.hasClass('open')) {
						_this.removeClass('open').find('i').html('+').end().siblings('dd').slideToggle('fast');
					}else{
						_this.addClass('open').find('i').html('-&nbsp;').end().siblings('dd').slideToggle('fast');
					}
				},
				initRouter:function(menu){
					//根路径
					avalon.router.get('/',model.switchMenu);
					//如果有子菜单，加载菜单对应的路由
					if(menu.subMenu!==undefined && menu.subMenu.length > 0){
						avalon.each(menu.subMenu,function(idx,item){
							var path = '/'+item.id;
							if(item.subMenu!==undefined && item.subMenu.length>0){
								
								avalon.each(item.subMenu,function(idx,item){
								
									avalon.router.get(path+'/'+item.id,model.switchMenu);
								});
								
							}else{
							
								avalon.router.get(path,model.switchMenu);
							}
						});
					}
					
				},
				switchMenu:function(){
				
					model.curMenu = this.path;
				
					avalon.log(this.path);
					//avalon.log(this.params);
					//avalon.log(this.query);
					var a = $('.ui-nav').find("[href='#!"+this.path+"']");

					//下面模拟一个用户的点击菜单事件
					var target = a.parent();
					
					$('.ui-nav').find('.selected').removeClass('selected');
					
					target.addClass('selected')
					//如果菜单已经打开直接返回
					if(target.parent().siblings('div').hasClass('open')){
						return ;
					}
					
					target.parent().siblings('div').click();
					target.siblings('dt').click();

				},
				render:function(){
					
					//加载完成
					//初始化路由表
					var data = model.menuData;
					if(data && data.length > 0){
						avalon.each(data,function(idx ,item){
							model.initRouter(item);
						});
						avalon.history.start({
							basepath: "/"
						});
						avalon.log('info init Router OK')
					}
				}
				
            });
			//model.menuData=[{id:1,name:"一级",subMenu:[{id:11,name:"二级",subMenu:[{id:111,name:"三级"}]}]},{id:2,name:"一级（二）"},{id:3,name:"一级(三)",subMenu:[{id:31,name:"二级"}]}];
			//加载菜单
		
			$.get(config.contentNavURL,function(data){
				model.menuData = data.menuData;
				model.render();
			});

			//监听当前的菜单，切换对应的视图
			model.$watch('curMenu',function(newval,oldval){
			 	avalon.vmodels['menuView'].loadView(newval);
			})
			
 return model;
});