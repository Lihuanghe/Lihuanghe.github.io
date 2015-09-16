require.config({
	baseUrl : "../../",
	paths : {
		text : 'assets/lib/text',
		css : 'assets/lib/css',
		avalon : 'assets/lib/avalon/avalon-1.5.1',
		jquery : 'assets/lib/jquery/1.9.0/jquery-1.9.0-min',
		base64 : 'assets/lib/base64/jquery.base64',
		ajax : 'assets/common/ajax',
		svMap : 'assets/common/svConfig'
	},
	shim:{
		ajax:{
			deps:['jquery']
		}
	}
});
require([ "avalon","jquery","assets/common/header","assets/common/leftMenu"], function(avalon) {

	avalon.scan();
});