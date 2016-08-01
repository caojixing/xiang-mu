$(function(){
	var len=$('.picList').find('li').size();
	    
	//点击x，删除对应的li 
	 $(".close").on('click',function(){
	 	$(this).parents('li').remove();
	 })
	function changeState(){
		
		//点击向左按钮
		$(".picList").on('click',".left",function(){
			var idx=$(this).parents('li').index();
			if(idx==0){
					$(this).parents('li').css({
						"transform":"translateX(650px)",
						"transition":"transform 1s"
					})
					$(this).parents('li').nextAll('li').css({
						"transform":"translateX(-150px)",
						"transition":"transform 1s"
					})
				}else{
					$(this).parents('li').css({
						"transform":"translateX(-162px)",
						"transition":"transform 1s"
					})
					
					$(this).parents('li').prev('li').css({
						"transform":"translateX(162px)",
						"transition":"transform 1s"
					})
					$(this).parents('li').one("webkitTransitionEnd",function(){
						$(this).parents().find("li").css({"transition":"","transform":"translateX(0)"});
						$(this).insertBefore($(this).prev());
					})
				}
		})
		//点击向右按钮
		$(".picList").on('click',".right",function(){
			var idx=$(this).parents('li').index();
			//idx++;
			if(idx==4){
				$(this).parents('li').css({
					"transform":"translateX(-650px)",
					"transition":"transform 1s"
				})
				$(this).parents('li').prevAll('li').css({
					"transform":"translateX(162px)",
					"transition":"transform 1s"
				})
				
			}else{
				$(this).parents('li').css({
					"transform":"translateX(162px)",
					"transition":"transform 1s"
				})
				
				$(this).parents('li').next('li').css({
					"transform":"translateX(-162px)",
					"transition":"transform 1s"
				})
				$(this).parents('li').one("webkitTransitionEnd",function(){
					$(this).parents().find("li").css({"transition":"","transform":"translateX(0)"});
					$(this).insertAfter($(this).next());
				})
			}
		})
	}
	 changeState();
})