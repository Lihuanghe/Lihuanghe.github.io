/*
*	@author:fanyu
*	@desc: table pagination
*	@date：2015-09-18
    @params:obj:{
			    url : ajax地址
			    items_per_page : 每页数
			    page_index : 当前页
			    pagination : 分页id
			    onepage: 首次加载
			    params: 参数
			    vmId: vm
		    };
*/
define(['avalon','ajax','assets/common/loading/blockLoading','pagination'],function(avalon, ajax, loading){
	var pager = function(obj){
		loading.create('.ui-tablewidth');//添加loading提示
	    ajax.postJson(obj.url, 'start='+(obj.page_index*obj.items_per_page)+'&limit='+obj.items_per_page+'&'+obj.formStr, function(json,state){
			var _page = $("#"+obj.pagination);
			if(state){
 				obj.vmId.json = json.beans;
				//分页调用-只初始化一次
		        if(obj.onepage){
		    		if(json.total<1){
		    			_page.hide();
		    		}else{
			            _page.pagination( json.total , {
			                'items_per_page'      : obj.items_per_page,
			                'current_page': obj.page_index ,
			                'num_display_entries' : 3,
			                'num_edge_entries'    : 1,  
			                'link_to': 'javascript:;',
			                'prev_text'           : "<",  
			                'next_text'           : ">",  
			                'call_callback_at_once' : false,  //控制分页控件第一次不触发callback.
			                'callback'            : function(page_index, jq){
									                	var obj1 = {
								                		    url : obj.url,
								                		    items_per_page : obj.items_per_page ,   		// 每页数     @param : limit
								                		    page_index : page_index , 	//当前页  @param : start
								                		    pagination : obj.pagination , 	//分页id
								                		    onepage: false,
								                		    params: obj.formStr,
								                		    vmId:obj.vmId
								                	    };
														pager(obj1);
													}  
			            });
			            _page.next().text("共"+json.total+"条").show();

			            if(_page.prev().length<1){
			            }else{
	                        _page.prev().show();
	                    }
		    		}
		        }
			}else{

			}
			loading.close('.ui-tablewidth');
		});
	}
	return pager;
})