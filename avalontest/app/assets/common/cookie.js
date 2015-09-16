/**
 * 通过 HTTP 请求加载远程数据，底层依赖jQuery的AJAX实现。当前接口实现了对jQuery AJAX接口的进一步封装。
 */
define(['jquery',''], function($){
	var cookie = {
		/**
		 * 显示当前对象名称路径
		 * 
		 * @method toString
		 * @return {String} 'Rose.string'
		 */
		toString : function() {
			return 'Rose.cookie';
		},  
	    /**
		 * 设置一个cookie
		 * @method set
		 * @param {String} name cookie名称
		 * @param {String} value cookie值
		 * @param {String} path 所在路径
		 * @param {Number} expires 存活时间，单位:小时
		 * @param {String} domain 所在域名
		 * @return {Boolean} 是否成功
		 */
	    set : function(name, value, expires, path, domain) {
	       	var str = name + "=" + encodeURIComponent(value);
	   		if (expires != undefined && expires != null && expires != '') {
	   			if (expires == 0) {expires = 100*365*24*60;}
	   			var exp = new Date();
	   			exp.setTime(exp.getTime() + expires*60*1000);
	   			str += "; expires=" + exp.toGMTString();
	   		}
	   		if (path) {
	   			str += "; path=" + path;
	   		} else {
	   			str += "; path=/";
	   		}
	   		if (domain) {str += "; domain=" + domain;}
	   		document.cookie = str;
	    },
	    /**
		 * 获取指定名称的cookie值
		 * @method get
		 * @param {String} name cookie名称
		 * @return {String} 获取到的cookie值
		 */
		get : function(name) {
			var v = document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
			return v ? decodeURIComponent(v[1]) : null;
		},
		/**
		 * 删除指定cookie,复写为过期
		 * @method remove 
		 * @param {String} name cookie名称
		 * @param {String} path 所在路径
		 * @param {String} domain 所在域
		 */
		remove : function(name, path, domain) {
			document.cookie = name + "=" +
				((path) ? "; path=" + path : "") +
				((domain) ? "; domain=" + domain : "") +
				"; expires=Thu, 01-Jan-70 00:00:01 GMT";
		}
	};

	return cookie;
});