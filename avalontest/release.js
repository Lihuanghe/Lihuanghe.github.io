(function(){
var fs = require('fs');
var crypto = require('crypto');

var fileList = [];
var basepath = '';
var output = 'app/requireconfig.js'

var config = [{
	path : 'app',
	excludes: [output,'app/assets/data/*','app/assets/fonts/*','app/assets/img/*','app/assets/lib/*']
}];
 
//根据文件内容计算md5串
function getDataMd5(data) {
  return crypto.createHash('md5').update(data).digest('hex');
};

function walk(path , matcher){
  var dirList = fs.readdirSync(path);

  dirList.forEach(function(item){
  	var fileName = path + '/' + item;
    if(fs.statSync(fileName).isDirectory()){
      walk(fileName,matcher);
    }else{
    	if(matcher(fileName)){
    		var content = fs.readFileSync(fileName);
    		var digest = getDataMd5(content);
    		 fileList.push({file : fileName , digest : digest.substr(0,8)});
    	}
    }
  });
}

var isArray = function(v){
            return toString.apply(v) === '[object Array]';
        }

config.forEach(function(item){
	walk(item.path, function(path){
		if(item.excludes === undefined) return true;
		if(!isArray(item.excludes)) return true;

		for(var idx = 0 ; idx < item.excludes.length ;idx ++){
			var regStr = item.excludes[idx];

			var tmpstr = regStr.replace('\.','\\.').replace('*','.*') + '$';

			
			var reg = new RegExp(tmpstr);

			if(reg.test(path)){
				return false
			}
		}
		return true;
		
	});
});

var buf = [];
buf.push('var requireConfig = (function(){');
buf.push('\tvar map = {');
for(var i = 0 ;i<fileList.length;i++){
	var obj = fileList[i];
	if(i===fileList.length-1)
		buf.push('\t"'+obj.file+'" : ' +  '"'+obj.digest+'"');
	else
		buf.push('\t"'+obj.file+'" : ' +  '"'+obj.digest+'",');
}
buf.push('\t};');
buf.push('\treturn {get : function(key){\n\t\treturn map[key];\n\t}};');
buf.push('})();');

fs.writeFileSync(output, buf.join('\n'), 'utf8');
})()