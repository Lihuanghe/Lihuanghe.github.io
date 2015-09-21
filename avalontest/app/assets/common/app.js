require.config({
	baseUrl : "../../",
	paths : {
		text : 'assets/lib/text',
		css : 'assets/lib/css',
		avalon : 'assets/lib/avalon/avalon',
		jquery : 'assets/lib/jquery/1.9.0/jquery-1.9.0-min',
		base64 : 'assets/lib/base64/jquery.base64',
		ajax : 'assets/common/ajax',
		pagination : 'assets/lib/pagination/1.2.1/jquery.pagination',
		pager : 'assets/common/pager',
		svMap : 'assets/common/svConfig',
		blockUI:'assets/lib/blockUI/2.64/jquery.blockUI.min'
	},
	shim:{
		ajax:{
			deps:['jquery']
		},
		pagination:{
			exports: 'pagination'
		},
		pager:{
			deps:['jquery','pagination']
		},
		blockUI:{
			deps:['jquery']
		}
	}
});
require([ "avalon","jquery","assets/common/header","assets/common/leftMenu","js/tableTpl"], function(avalon) {

	avalon.scan();
});