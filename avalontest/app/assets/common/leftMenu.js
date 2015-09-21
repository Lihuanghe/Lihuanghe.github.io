define(['avalon','jquery','ajax','svMap'],function (avalon, $, Ajax,svMap) {

	svMap.add("leftNav","../../assets/data/contentNav.json",'');//配置ajax服务路径

	Ajax.postJson(svMap.get("leftNav"), "", function(json, status){
		if (status) {
			leftNav.data = json.menuData;
		}else{
			alert('error');
		}
	});

	var leftNav = avalon.define({
		$id: "leftNav",
		data: [],
		firstFunc: function(el){
				var _this = $(this);
				if (_this.hasClass('open')) {
					if (_this.siblings('dl').find('dt').length) {
						_this.removeClass('open').find('.arrow').html('∧').end().siblings('dl').slideToggle('fast');
					}else{
						_this.removeClass('open').find('.arrow').html('∧').end().siblings('dl').show().find('dd').slideToggle('fast');
					}
				}else{
					if (_this.siblings('dl').find('dt').length) {
						_this.addClass('open').find('.arrow').html('∨').end().siblings('dl').slideToggle('fast');
					}else{
						_this.addClass('open').find('.arrow').html('∨').end().siblings('dl').show().find('dd').slideToggle('fast');
					}
				}
		},
		secondFunc: function(el){
			var _this = $(this);
			if (_this.hasClass('open')) {
				_this.removeClass('open').find('i').html('+').end().siblings('dd').slideToggle('fast');
			}else{
				_this.addClass('open').find('i').html('-&nbsp;').end().siblings('dd').slideToggle('fast');
			}
		}
	})

	return leftNav;
})