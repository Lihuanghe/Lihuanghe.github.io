/*
*	@author:fanyu
*	@desc:table ajax loading
*	@date：2015-09-20
*/
define(['blockUI'],function(){
	var blockLoading = {
		create:function(obj,text){
			text = text?text:'正在加载中，请稍候...';
			$(obj).block({
	            message: '<div class="fn-loading">'+text+'</div>', 
	            css: { border:'1px solid #DDD', padding:"10px 20px",textAlign:"left",width:'20%'},
	            overlayCSS:{
	                backgroundColor: '#333', 
	                opacity:  0.2, 
	                cursor: 'wait' 
	            }
	        });
		},
		close:function(obj){
			$(obj).unblock();	
		}	
	}
	return blockLoading;
})