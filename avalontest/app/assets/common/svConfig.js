/*
    ajax服务地址管理器
    修改conf切换调用地址
    0：调用前端mock数据
    1：调用后台真是数据
*/
define([''], function () {
    var svMap = {
        /*
            mock数据开关
        0：调用前端mock数据
        1：调用后台真是数据
        */
        conf: 0,
        /*
            路径前缀
            srcPref[0]: mock数据路径前缀
            srcPref[1]: 后台地址路径前缀
        */
        // var srcPref = ["../../data/","http://221.176.67.103:30000/ecp/"];
        srcPref: ["../../asset/data/","/smsManager/"],
        //
        svArray: [
            {
                //"query":"../../asset/data/query.json",//demo
            },
            {
                //"query":"/smsManager/front/pc/pcprnca!query",//demo
            }
        ],
        add: function(uid, mockSrc, srvSrc) {
            this.svArray[0][uid] = this.srcPref[this.conf] + mockSrc;
            this.svArray[1][uid] = this.srcPref[this.conf] + srvSrc;         
        },
        get: function(uid) {
            return this.svArray[this.conf][uid];
        },
        getAppPath:function(){
            return this.srcPref[conf];
        },
        svArrays:function(){
            return this.svArray[conf];
        }
    }
    return svMap;
});