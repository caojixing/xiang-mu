$(function(){
        
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
	
	reg();
	function reg(){
		$("#ul .input1").blur(function(){
			var reg=/[\u4e00-\u9fa5]/,
				
				val1=$(".input1").val();
				
				console.log(val1.length);
			if(reg.test(val1) && val1.length>=2){			
					alert("姓名输入正确");
					return true;			
			}else{
				alert("错误");
				return false;
			}
		})

		$("#ul .input2").blur(function(){
			var reg1=/(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
				val2=$(".input2").val();
			if(reg1.test(val2)){
				alert("身份证号正确");
				return true;
			}else{
				return false;
			}
		})

		$("#ul .input3").blur(function(){
			var val3=$(".input3").val();
			if(val3.length!=0){
				alert("正确");
				return true;
			}else{
				alert("地址不能为空");
				return false;
			}
		})

		$("#ul .input4").blur(function(){
			var reg4=/1[3578]\d{9}/,
				val4=$(".input4").val();
				if(reg4.test(val4)){
					alert("手机号码输入正确");
					return true;
				}else{
					alert("手机号码输入错误");
					return false;
				}
		})
	}

	$("#btn").on("click",function(){
		input11=
	})

	
	$("#ul .input1").blur(function(){
			var reg=/[\u4e00-\u9fa5]/,
				val1=$(".input1").val();	
			if(reg.test(val1) && val1.length>=2){			
					alert("姓名输入正确");
					return true;			
			}else{
				alert("错误");
				return false;
			}
		})
	

	
	
});