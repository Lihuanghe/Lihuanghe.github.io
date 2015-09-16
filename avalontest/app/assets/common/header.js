define(['avalon'],function(avalon){
	var vm_header = avalon.define({
		$id : "header",
		headerData : [
			{
				"uid" : "1001",
				"name" : "个人中心"
			},
			{
				"uid" : "1002",
				"name" : "切换角色"
			},
			{
				"uid" : "1003",
				"name" : "注销"
			}
		],
		onclick:function(el){
			console.log(this.innerHTML);
		}
	})
})