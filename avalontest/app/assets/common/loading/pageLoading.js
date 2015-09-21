/*
*	@author:fanyu
*	@desc:page loading
*	@date：2015-09-20
*/
define(['text!tpl/loading.tpl', 'css!assets/css/util/loading.css'], function(source) {
        var $el = $(source);
        var fun = function(){
        	$('body').append($el);
        }
        var elDestroy = function(){
        	$el.remove();
        }
        return { init:fun, destroy:elDestroy };
    }
);
