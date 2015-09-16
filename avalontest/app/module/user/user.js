define(['avalon','jquery','config'],function(avalon,jquery,config){
	var user = (function User(){
		var _isLogin=false;

	 	this.username = "";

	 	this.userid = "";

	 	this.isLogin = function(){
	 		return _isLogin;
	 	};

	 	this.login = function(username,passwd,callback){
	 	
	 		$.post(config.loginURL,{u:username,p:passwd},function(data){
	 			if(data.result === 0){
	 				this.username = username;
	 				this.userid = data.data.userid;
	 				_isLogin = true;
	 			}
	 			callback(data);
	 		})
	 	};

	 	this.logout=function(callback){
		$.post(config.logoutURL,function(data){
	 			if(data.result === 0){
	 				_isLogin = false;
	 			}
	 			callback(data);
	 		})
	 	};

	 	return {
	 		isLogin : this.isLogin,
	 		login : this.login,
	 		logout :this.logout
	 	}
	})();

	return user;
});