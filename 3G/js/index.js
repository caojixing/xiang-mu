(function($){
	$("input").on('input',function(){
		var val=$(this).val();
		$(this).val('￥'+val.replace('￥',''))
	})
})(jQuery)