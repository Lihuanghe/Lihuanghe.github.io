define(['config','wrapper','ztree','text!app/module/menuView/ztree/demo.html','css!app/assets/lib/ztree/css/demo.css','css!app/assets/lib/ztree/css/zTreeStyle/zTreeStyle.css'],
	function(config,wrapper,ztree,viewHTML){
	    var setting = {
			async: {
				enable: true,
				url:"app/assets/data/ztree.json",
				autoParam:["id", "name=n", "level=lv"],
				otherParam:{"otherParam":"zTreeAsyncTest"},
				dataFilter: filter
			}
		};

		function filter(treeId, parentNode, childNodes) {
			if (!childNodes) return null;
			for (var i=0, l=childNodes.length; i<l; i++) {
				childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
			}
			return childNodes;
		}

		var zNodes =[
			{ name:"父节点1 - 展开", open:true,
				children: [
					{ name:"父节点11 - 折叠",
						children: [
							{ name:"叶子节点111"},
							{ name:"叶子节点112"},
							{ name:"叶子节点113"},
							{ name:"叶子节点114"}
						]},
					{ name:"父节点12 - 折叠",
						children: [
							{ name:"叶子节点121"},
							{ name:"叶子节点122"},
							{ name:"叶子节点123"},
							{ name:"叶子节点124"}
						]},
					{ name:"父节点13 - 没有子节点", isParent:true}
				]},
			{ name:"父节点2 - 折叠",
				children: [
					{ name:"父节点21 - 展开", open:true,
						children: [
							{ name:"叶子节点211"},
							{ name:"叶子节点212"},
							{ name:"叶子节点213"},
							{ name:"叶子节点214"}
						]},
					{ name:"父节点22 - 折叠",
						children: [
							{ name:"叶子节点221"},
							{ name:"叶子节点222"},
							{ name:"叶子节点223"},
							{ name:"叶子节点224"}
						]},
					{ name:"父节点23 - 折叠",
						children: [
							{ name:"叶子节点231"},
							{ name:"叶子节点232"},
							{ name:"叶子节点233"},
							{ name:"叶子节点234"}
						]}
				]},
			{ name:"父节点3 - 没有子节点", isParent:true}

		];

	wrapper.wrap('tree', '<ul class="ztree">></ul>',function(vm,el){
		$.fn.zTree.init($(el), vm.$model.setting, vm.$model.wrapperOptions);
		//$.fn.zTree.init($(el), vm.$model.setting, vm.$model.wrapperOptions);
 	});

	var model = avalon.define({
                $id: "treeView",
                wrapperOptions:{"wrapperOptions":null ,"setting" :setting}
      });

// 定义视图模块
	var viewmod =  {
	    viewtSrc:viewHTML ,
		viewInit:function(){},   //模块view加载完成后的回调方法，在刷新（F5）时可能调用两次
		viewDestroy:function(){} //切换菜单时销毁原来的view
	 };
	 return viewmod;
});