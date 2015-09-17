define(['map'],function(map){
	var config = {
		loginURL :  'app/assets/data/user.json',
		logoutURL : 'app/assets/data/user.json',
		contentNavURL : 'app/assets/data/contentNav.json',
		pathMap : map       //存储每个菜单对应的模块
	};
	//加载菜单视图模块
	require(['app/module/menuView/demo/demo.js',
		'app/module/menuView/demo31/demo.js',
		'app/module/menuView/demo32/demo.js'
		] ,
		function(){

	});
	return config;
});