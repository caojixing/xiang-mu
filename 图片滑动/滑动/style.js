;(function($){

//向左移动
	$(".left").on("click",function(){
		
	var idx=$(this).parents('.par').index();
		if(idx==0){
			$(this).parents(".par").css({
				"transform":"translateX(600px)",
				"transition":"all 2s"
		    })	
		    $(this).parents('.par').nextAll('.par').css({
		    	"transform":"translateX(-200px)",
		    	"transition":"all 2s"
		    })
		}else{
			$(this).parents('.par').css({
				"transform":"translateX(-200px)",
				"transition":"all 2s"
			})	

			$(this).parents('.par').prev('.par').css({
				"transform":"translateX(200px)",
				"transition":"all 2s"
			})
			$(this).parents('.par').one("webkitTransitionEnd",function(){
					$(this).parents().find(".par").css({
						"transition":"",
						"transform":"translateX(0)"
					});
			$(this).insertBefore($(this).prev());
			})
		}
		
	})




//向右移动
	$(".right").on("click",function(){
	    var idx=$(this).parents('.par').index();
		if(idx==3){

			$(this).parents('.par').css({
				"transform":"translateX(-600px)",
				"transition":"all 2s"
			})

			$(this).parents(".par").prevAll(".par").css({
				"transform":"translateX(200px)",
				"transition":"all 2s"
			})

		}else{

			$(this).parents('.par').css({
					"transform":"translateX(200px)",
					"transition":"transform 2s"
				})
				
				$(this).parents('.par').next('.par').css({
					"transform":"translateX(-200px)",
					"transition":"transform 2s"
				})
				
				$(this).parents('.par').one("webkitTransitionEnd",function(){
					$(this).parents().find(".par").css({
					   "transition":"","transform":"translateX(0)"});

					$(this).insertAfter($(this).next());
				})
		}
	})




//删除
	$(".rem").on("click",function(){
		$(this).parents(".par").remove();
	})

})(jQuery)





/*$(function(){

})*/