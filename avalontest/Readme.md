# 发布须知

release.js是为解决使用require.js加载html.js文件时的浏览器缓存问题。

使用`node release`会后成文件requireconfig.js。 在index.html会加载此文件。

我修改了require.js的源代码，使用urlArgs参数支持function . 在此function里从requireconfig.js里获取文件对应的md5值 。


参考此文的方法实现： requirejs加载文件带上md5版本号的解决方案( http://www.tuicool.com/articles/N3ENvur)