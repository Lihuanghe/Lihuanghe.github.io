define(['map'],function(map){
	//加载菜单视图模块
	var config = {
		loginURL :  'app/assets/data/user.json',
		logoutURL : 'app/assets/data/user.json',
		contentNavURL : 'app/assets/data/contentNav.json',
		pathMap : map       //存储每个菜单对应的模块
	};
	return config;
});