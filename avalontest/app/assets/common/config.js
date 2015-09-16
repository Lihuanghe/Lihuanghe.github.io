var conf = 1; //控制服务    0：调用前端假数据   1：调用后台真是数据
var srvMap = (function(){
    // var srcPref = ["../../data/","http://221.176.67.103:30000/ecp/"];
    var srcPref = ["../../asset/data/","/ecp/"];
    //项目公用服务路径写在dataArray内，业务服务请写在业务页面内部
    var dataArray = [
        {
            "query":srcPref[conf]+"query.json",//demo
            "leftMenu":srcPref[conf]+"leftMenu.json",//左侧菜单
            "topMenu":srcPref[conf]+"topMenu.json",//顶部菜单
            "menuCrumbs":srcPref[conf]+"menuCrumbs.json",//菜单面包屑
            "curUser":srcPref[conf]+"session.json",//当前用户信息
            "btnAuthority":srcPref[conf]+"btnAuthority.json",//按钮权限
            "custInfo":srcPref[conf]+"custInfo.json",//话务左侧--用户信息
            "contactHistory":srcPref[conf]+"contactHistory.json",//话务左侧--接触历史
            "billHistory":srcPref[conf]+"billHistory.json",//话务左侧--订单历史
            "appointHistory":srcPref[conf]+"appointHistory.json",//话务左侧--预约历史
            "marketActivity":srcPref[conf]+"marketActivity.json"//话务左侧--营销活动
        },
        {
            "query":srcPref[conf]+"front/pc/pcprnca!query",//demo
            "leftMenu":srcPref[conf]+"front/sh/login!getLeftMenu",//左侧菜单
            "topMenu":srcPref[conf]+"front/sh/login!getTopMenu",//顶部菜单
            "menuCrumbs":srcPref[conf]+"front/sh/login!getParentMenu",//菜单面包屑
            "curUser":srcPref[conf]+"front/sh/user!session",//当前用户信息
            "btnAuthority":srcPref[conf]+"front/sh/user!btnAuthority?uid=u001",//按钮权限
            "custInfo":srcPref[conf]+"custInfo.json",//话务左侧--用户信息
            "contactHistory":srcPref[conf]+"contactHistory.json",//话务左侧--接触历史
            "billHistory":srcPref[conf]+"billHistory.json",//话务左侧--订单历史
            "appointHistory":srcPref[conf]+"appointHistory.json",//话务左侧--预约历史
            "marketActivity":srcPref[conf]+"marketActivity.json",//话务左侧--营销活动
            "orderDividePage":srcPref[conf]+"front/sh/market!index"//今日下单量页面跳转
            
        }
    ];
    return {
        add: function(uid, mockSrc, srvSrc) {
            dataArray[0][uid] = srcPref[conf] + mockSrc;
            dataArray[1][uid] = srcPref[conf] + srvSrc;         
        },
        get: function(uid) {
            return dataArray[conf][uid];
        },
        getAppPath:function(){
        	return srcPref[conf];
        },
        dataArrays:function(){
            return dataArray[conf];
        }
    };
})(jQuery);

/**
 * tpl 定义
 */
var tplMap = (function(){
    var version = '20131225';
    var tplPref = ["/aiscrm/pc/base/tpl/","page/"];
    var tpl = {
        // 办理路径
        "globalPath":tplPref[conf]+"globalPath.tpl"
    };
    
    // 为tpl添加版本号
    version = '?ver=' + version;
    for(var perTpl in tpl){
        if(tpl.hasOwnProperty(perTpl)){
        	var tplPath = tpl[perTpl];
        	tplPath = (conf==1)?tplPath.replace(".tpl","_tpl"):tplPath;
            tpl[perTpl] = tplPath+version;
        }
    }
    
    return {
        add: function(uid,tplSrc) {
            if(1 == conf){
                tplSrc = tplSrc.replace(".tpl","_tpl");
            }
            tpl[uid] = tplPref[conf] + tplSrc + version;
        },
        get: function(uid) {
            return tpl[uid];
        },
        tpls: function() {
            return tpl;
        }
    };
})(jQuery);


//将srvMap和tplMap对象注册为符合AMD规范的模块，可使用requireJS模块化加载
if (typeof define === "function" && define.amd) {
    define('srvMap',[], function () {
        return srvMap;
    });
}
if (typeof define === "function" && define.amd) {
    define('tplMap',[], function () {
        return tplMap;
    });
}