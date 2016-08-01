$(function(){
    $('.btn').on('click',function(){
    	window.location.href="订单详情.html";
    })    
           /*$(".input1").on("click",function(){  
           		$(this).blur(function(){
           			if(this.value==""){
           			   alert("姓名不能为空");
           		    }else if(this.value.length>2 && this.value<6){
           			   alert("请输入长度大于2且小于6得字符长度")
           		    }else{
           			   alert("输入正确")
           		  }      
           		})    		     		
           })*/
           
      
	/*$('.btn').on("click",function(){
		var 	
	       txt1=$('.input1').val(),
		   txt2=$('.input2').val(),
	       txt3=$('.input3').val(),
	       txt4=$('.input4').val();
		if(txt1.length!=0 && txt2.length!=0 && txt3.length!=0 && txt4.length!=0){
			$('.btn').css("background","#5E83E1")
		}else{
			alert('请填写完整！')
		}
	})*/

	$("#ul .input1").blur(function(){
		var reg=/[\u4e00-\u9fa5]/,
			
			val1=$(".input1").val();
			
			console.log(val1.length);
		if(reg.test(val1) && val1.length>=2){			
				alert("姓名输入正确")			
		}     
		
		else{
			alert("错误")
		}
	})

	$("#ul .input2").blur(function(){
		var reg1=/(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
			val2=$(".input2").val();
		if(reg1.test(val2)){
			alert("身份证号正确")
		}
	})
	
});