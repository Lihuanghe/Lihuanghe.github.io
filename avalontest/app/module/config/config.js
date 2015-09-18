define(['map'],function(map){
	//加载菜单视图模块
	var map =  map.newMap();
	 map.put('/33', 'app/module/menuView/demo/demo.js');

	 map.put('/31', 'app/module/menuView/demo31/demo.js');
	 
	 map.put('/32', 'app/module/menuView/demo32/demo.js');

	var config = {
		loginURL :  'app/assets/data/user.json',
		logoutURL : 'app/assets/data/user.json',
		contentNavURL : 'app/assets/data/contentNav.json',
		pathMap : map       //存储每个菜单对应的模块
	};
	return config;
});