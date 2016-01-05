!function(){
"object"!=typeof JSON&&(window.JSON={
stringify:function(){
return"";
},
parse:function(){
return{};
}
});
var e=function(){
!function(){
var e={},n={},o={};
e.COMBO_UNLOAD=0,e.COMBO_LOADING=1,e.COMBO_LOADED=2;
var t=function(e,o,t){
if(!n[e]){
n[e]=t;
for(var r=3;r--;)try{
moon.setItem(moon.prefix+e,t.toString()),moon.setItem(moon.prefix+e+"_ver",moon_map[e]);
break;
}catch(a){
moon.clear();
}
}
},r=function(e){
if(!e||!n[e])return null;
var t=n[e];
return"function"!=typeof t||o[e]||(t=n[e]=t(r),o[e]=!0),t;
};
e.combo_status=e.COMBO_UNLOAD,e.run=function(){
var n=e.run.info,o=n&&n[0],t=n&&n[1];
if(o&&e.combo_status==e.COMBO_LOADED){
var a=r(o);
t&&t(a);
}
},e.use=function(n,o){
e.run.info=[n,o],e.run();
},window.define=t,window.seajs=e;
}(),function(){
function e(e){
var n=e.stack?e.stack:"";
try{
n=n.replace(/http(s)?:\/\/res\.wx\.qq\.com/g,"");
for(var t=/\/([^.]+)\/(\S+?)\.js(\,|:)?/g;t.test(n);)n=n.replace(t,"$2$3");
}catch(e){
n=e.stack?e.stack:"";
}
var r=[];
for(o in a)a.hasOwnProperty(o)&&r.push(o+":"+a[o]);
return r.push("STK:"+n.replace(/\n/g,"")),r.join("|");
}
function n(e){
if(!e){
var n=window.onerror;
window.onerror=function(){},e=setTimeout(function(){
window.onerror=n,e=null;
},50);
}
}
function t(n){
var o=e(n),t=new Image,a="http://mp.weixin.qq.com/mp/jsreport?key="+r+"&content="+encodeURIComponent(o);
t.src=a.slice(0,1024);
}
if(/mp\.weixin\.qq\.com\/s\?/.test(location.href)){
var r,a,i,c=window.define,s=window.$||"",u=s.ajax;
window.__initErrorReport=function(e,n){
r=e,a=n;
},u&&(window.$.ajax=function(e,o){
o||(o=e,e=void 0);
var a,c;
for(a in o)o.hasOwnProperty(a)&&(c=o[a],"function"==typeof c&&(o[a]=function(){
try{
return c.apply(this,arguments);
}catch(e){
throw e.stack&&console&&console.error&&console.error("[TryCatch]"+e.stack),r&&(t(e),
n(i)),e;
}
}));
return e?u.call(s,e,o):u.call(s,o);
}),window.seajs&&c&&(window.define=function(){
for(var e,o=[],a=0,s=arguments.length;s>a;a++){
var u=e=arguments[a];
"function"==typeof e&&(e=function(){
try{
return u.apply(this,arguments);
}catch(e){
throw e.stack&&console&&console.error&&console.error("[TryCatch]"+e.stack),r&&(t(e),
n(i)),e;
}
},e.toString=function(e){
return function(){
return e.toString();
};
}(arguments[a])),o.push(e);
}
return c.apply(this,o);
});
}
}(),function(e){
function n(e,n,t){
if("object"==typeof e){
var r=Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/,"$1");
if(t=t||e,"Array"==r){
for(var a=0,i=e.length;i>a;++a)if(n.call(t,e[a],a,e)===!1)return;
}else{
if("Object"!==r&&o!=e)throw"unsupport type";
if(o==e){
for(var a=e.length-1;a>=0;a--){
var c=o.key(a),s=o.getItem(c);
if(n.call(t,s,c,e)===!1)return;
}
return;
}
for(var a in e)if(e.hasOwnProperty(a)&&n.call(t,e[a],a,e)===!1)return;
}
}
}
var o=e.localStorage,t=document.head||document.getElementsByTagName("head")[0],r={
prefix:"__MOON__",
loaded:[],
unload:[],
hit_num:0,
mod_num:0,
version:1e3,
init:function(){
r.loaded=[],r.unload=[];
var t,a,i;
if(o){
var c="_moon_ver_key_",s=o.getItem(c);
s!=r.version&&(r.clear(),o.setItem(c,r.version));
}
if(-1!=location.search.indexOf("no_moon=1")&&r.clear(),o){
var u=1*o.getItem(r.prefix+"clean_time"),f=+new Date;
if(f-u>=1296e6){
r.clear();
try{
!!o&&o.setItem(r.prefix+"clean_time",+new Date);
}catch(l){}
}
}
n(moon_map,function(n,c){
if(a=r.prefix+c,i=!!n&&n.replace(/^http(s)?:\/\/res.wx.qq.com/,""),t=!!o&&o.getItem(a),
version=!!o&&(o.getItem(a+"_ver")||"").replace(/^http(s)?:\/\/res.wx.qq.com/,""),
r.mod_num++,t&&i==version)try{
var s="//# sourceURL="+c+"\n//@ sourceURL="+c;
e.eval.call(e,'define("'+c+'",[],'+t+")"+s),r.hit_num++;
}catch(u){
r.unload.push(i.replace(/^http(s)?:\/\/res.wx.qq.com/,""));
}else r.unload.push(i.replace(/^http(s)?:\/\/res.wx.qq.com/,""));
}),r.load(r.genUrl());
},
genUrl:function(){
var e=r.unload;
if(!e||e.length<=0)return[];
for(var n,o,t="",a=[],i={},c=-1!=location.search.indexOf("no_moon=2"),s=0,u=e.length;u>s;++s)/^\/(.*?)\//.test(e[s]),
RegExp.$1&&(o=RegExp.$1,t=i[o],t?(n=t+","+e[s],n.length>1e3||c?(a.push(t+"?v="+r.version),
t=location.protocol+"//res.wx.qq.com"+e[s],i[o]=t):(t=n,i[o]=t)):(t=location.protocol+"//res.wx.qq.com"+e[s],
i[o]=t));
for(var f in i)i.hasOwnProperty(f)&&a.push(i[f]);
return a;
},
load:function(e){
if(!e||e.length<=0)return seajs.combo_status=seajs.COMBO_LOADED,void seajs.run();
seajs.combo_status=seajs.COMBO_LOADING;
var o=0;
n(e,function(n){
var r=document.createElement("script");
r.src=n,r.type="text/javascript",r.async=!0,"undefined"!=typeof moon_crossorigin&&moon_crossorigin&&r.setAttribute("crossorigin",!0),
r.onload=r.onreadystatechange=function(){
!r||r.readyState&&!/loaded|complete/.test(r.readyState)||(o++,r.onload=r.onreadystatechange=null,
o==e.length&&(seajs.combo_status=seajs.COMBO_LOADED,seajs.run()));
},t.appendChild(r);
});
},
setItem:function(e,n){
!!o&&o.setItem(e,n);
},
clear:function(){
o&&n(o,function(e,n){
~n.indexOf(r.prefix)&&o.removeItem(n);
});
}
};
window.moon=r;
}(window),window.moon.init();
};
e(),moon.setItem(moon.prefix+"biz_wap/moon.js",e.toString());
}();