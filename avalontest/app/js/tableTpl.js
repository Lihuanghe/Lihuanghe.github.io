define(['avalon','jquery','ajax','svMap','pager','css!assets/lib/pagination/1.2.1/pagination.css'],function(avalon,$,ajax,svMap,pager){
	svMap.add('tableTpl', 'tableTpl.json', '');


    var tableTpl = avalon.define({
    	$id: 'tableTpl',
    	json: [],
    	edit:function(id){
    		console.log(id)
    	},
    	del:function(id){
    		console.log(id)
    	}
    })

	
    var G_params = {
	    url : svMap.get('tableTpl'),
	    items_per_page : 10 ,   		// 每页数     @param : limit
	    page_index : 0 , 				//当前页  @param : start
	    pagination : "J_pager" , 		//分页id
	    onepage: true,					//首次加载
	    params: '',						//参数
	    vmId:tableTpl					//vm
    };

	var searchForm = avalon.define({
		$id: "searchForm",
		datas: {
			busiName: '',
			busiName1: '',
			busiName2: '',
			busiName3: '',
			start: '',
			end: '',
		},
		submit: function(){
			pager(G_params);

			//console.log(searchForm.$model.datas)
		}
	})

	var tableWrap = avalon.define({
		$id: "tableWrap",
		operat: function(){
			//console.log(tableTpl.$model.json);
		}
	})
})