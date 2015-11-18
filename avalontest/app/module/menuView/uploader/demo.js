define(['config','text!app/module/menuView/uploader/demo.html','wrapper','jqUploader'],function(config,viewHTML,wrapper,jqUploader){
	 var isOnGitHub = window.location.hostname === 'lihuanghe.github.io',
        url = isOnGitHub ? '//jquery-file-upload.appspot.com/' : 'app/assets/data/upload.json';
	var wrapperOptions = { 
							url: url,
							dataType: 'json',
							//必须为false,否则uploader的组件会替换dom ,造成avalon回复组件的vm
							replaceFileInput: false,
							autoUpload:false,
							add: function (e, data) {
								model.preview = '';
					            data.context = $('<button/>').text('Upload')
					                .insertAfter($(avalon.vmodels.test.$DOMelement))
					                .click(function () {
					                    data.context = $('<p/>').text('Uploading...').replaceAll($(this));
					                    data.submit();
					                });
					        },
					        done: function (e, data) {
					            data.context.remove();
					           	model.preview = data.result.files[0].url
					        }
						};
						
	wrapper.wrap('upload', '<input  type="file">',function(vm,el){
		$(el).fileupload(vm.$model.wrapperOptions);
 	});

	var model = avalon.define({
                $id: "uploadVM",
                wrapperOptions:{"wrapperOptions":wrapperOptions},
                preview:''
      });

// 定义视图模块
	var viewmod =  {
	    viewtSrc:viewHTML ,
		viewInit:function(){},   //模块view加载完成后的回调方法，在刷新（F5）时可能调用两次
		viewDestroy:function(){} //切换菜单时销毁原来的view
	 };


	 return viewmod;
});