/**
* @author:fanyu
* @date：2015-09-16
* @desc: 通过 HTTP 请求加载远程数据，底层依赖jQuery的AJAX实现。当前接口实现了对jQuery AJAX接口的进一步封装。
*/
define(['jquery'], function($){
	var ajax = {
		/**
		 * 请求状态码
		 * @type {Object}
		 */
		reqCode : {
			/**
			 * 成功返回码 0
			 * @type {Number} 1
			 * @property SUCC
			 */
			SUCC : 0
		},
		/**
		 * 请求的数据类型
		 * @type {Object}
		 * @class reqDataType
		 */
		dataType : {
			/**
			 * 返回html类型
			 * @type {String}
			 * @property HTML
			 */
			HTML : "html",
			/**
			 * 返回json类型
			 * @type {Object}
			 * @property JSON
			 */
			JSON : "json",
			/**
			 * 返回text字符串类型
			 * @type {String}
			 * @property TEXT
			 */
			TEXT : "text"
		},
		/**
		 * 超时,默认超时30000ms
		 * @type {Number} 10000ms
		 * @property TIME_OUT
		 */
		TIME_OUT : 30000,
		/**
		 * 显示请求成功信息
		 * 
		 * @type {Boolean} false
		 * @property SHOW_SUCC_INFO
		 */
		SHOW_SUCC_INFO : false,
		/**
		 * 显示请求失败信息
		 * 
		 * @type {Boolean} false
		 * @property SHOW_ERROR_INFO
		 */
		SHOW_ERROR_INFO : false,
		/**
		 * GetJson是对ajax的封装,为创建 "GET" 请求方式返回 "JSON"(text) 数据类型
		 * @param {String}
		 *            url HTTP(GET)请求地址
		 * @param {Object}
		 *            cmd json对象参数
		 * @param {Function}
		 *            callback [optional,default=undefined] GET请求成功回调函数
		 */
		getJson : function(url, cmd, callback) {
			if (arguments.length !== 3)
				callback = cmd, cmd = '';
			dataType = this.dataType.JSON;
			this.ajax(url, 'GET', cmd, dataType, callback);
		},
		/**
		 * GetJson是对ajax的封装,为创建 "GET" 请求方式返回 "JSON"(text) 数据类型
		 * 采用同步阻塞的get方式调用ajax
		 * @param {String}
		 *            url HTTP(GET)请求地址
		 * @param {Object}
		 *            cmd json对象参数
		 * @param {Function}
		 *            callback [optional,default=undefined] GET请求成功回调函数
		 */
		getJsonAsync : function(url, cmd, callback) {
			if (arguments.length !== 3)
				callback = cmd, cmd = '';
			dataType = this.dataType.JSON;
			this.ajax(url, 'GET', cmd, dataType, callback, true);
		},
		/**
		 * PostJsonAsync是对ajax的封装,为创建 "POST" 请求方式返回 "JSON"(text) 数据类型,
		 * 采用同步阻塞的post方式调用ajax
		 * @param {String}
		 *            url HTTP(POST)请求地址
		 * @param {Object}
		 *            cmd json对象参数
		 * @param {Function}
		 *            callback [optional,default=undefined] POST请求成功回调函数
		 */
		postJsonAsync : function(url, cmd, callback) {
			dataType = this.dataType.JSON;
			this.ajax(url, 'POST', cmd, dataType, callback, true);
		},
		/**
		 * PostJson是对ajax的封装,为创建 "POST" 请求方式返回 "JSON"(text) 数据类型
		 * @param {String}
		 *            url HTTP(POST)请求地址
		 * @param {Object}
		 *            cmd json对象参数
		 * @param {Function}
		 *            callback [optional,default=undefined] POST请求成功回调函数
		 */
		postJson : function(url, cmd, callback) {
			dataType = this.dataType.JSON;
			this.ajax(url, 'POST', cmd, dataType, callback,'');
		},
		/**
		 * 基于jQuery ajax的封装，可配置化
		 * 
		 * @method ajax
		 * @param {String}
		 *            url HTTP(POST/GET)请求地址
		 * @param {String}
		 *            type POST/GET
		 * @param {Object}
		 *            cmd json参数命令和数据
		 * @param {String}
		 *            dataType 返回的数据类型
		 * @param {Function}
		 *            callback [optional,default=undefined] 请求成功回调函数,返回数据data和isSuc
		 */
		ajax : function(url, type, cmd, dataType, callback, sync) {
			var param = "";
			async = sync ? false : true;
			var thiz = this;
			var cache = (dataType == "html") ? true : false;
			$.ajax({
				url : url,
				type : type,
				data : cmd,
				// data : encodeURI(cmd),
				/*processData: false,  	// 不处理发送的数据
				contentType: false,		// 不设置Content-Type请求头*/
				cache : cache,
				dataType : dataType,
				async : async,
				timeout : thiz.TIME_OUT,
				beforeSend : function(xhr) {
					xhr.overrideMimeType("text/plain; charset=utf-8");
				},
				success : function(data) {
					if (!data) {
						return;
					}
					if (dataType == "html") {
						callback(data, true);
						return;
					}
					try {
						//data = eval('(' + data + ')');
						//超时重定向至登陆页
						if (data.returnCode=='BUSIOPER=RELOGIN') {
							//判断是否存在iframe
			                window.location.href = '../../login.html';
							return;
						}
					} catch (e) {
						alert("JSON Format Error:" + e.toString());
					}
					var isSuc = thiz.printReqInfo(data);
					if (callback && data) {
						callback(data || {}, isSuc);
					}
				},
				error : function() {
				    var retErr ={};
				    retErr['returnCode']="404";
				    retErr['returnMessage']="网络异常或超时，请稍候再试！"; 
					callback(retErr, false);
				},
	            complete:function(){
	            }
			});
		},
		/**
		 * 打开请求返回代码和信息
		 * 
		 * @method printRegInfo
		 * @param {Object}
		 *            data 请求返回JSON数据
		 * @return {Boolean} true-成功; false-失败
		 */
		printReqInfo : function(data) {
			if (!data){
				return false;
			}
			var code = data.returnCode, 
				succ = this.reqCode.SUCC;
			return !!(code == succ);
		}
	};

	return ajax;
});