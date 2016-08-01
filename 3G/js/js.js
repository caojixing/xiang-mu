$(function(){

  $(".input1").blur(function(){
      var txt=/[\u4e00-\u9fa5]/,
          val2=$(".input1").val();
          if(val2==""){
            alert("姓名不能为空");
          }else if(val2.length<2 || val2.length>6){
              alert("请输入2~6个字符")
          }else if(txt.test(val2)!=true){
              alert("请输入汉字")
          }else{
           $(".li").css({
              "border":"1px solid blue"
            })
           $(this).css(
              "color","#000"
            )
          }
  })
      
   $(".input2").blur(function(){
      /*var num=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; */
      
         //var num=/^(\d{18})|(^\d{17})(\d|x)$/;
         
         var num=/^\d{18}|[x]$/i
          val3=$(".input2").val();
          if(val3.length!=18){
            /*  alert("请输入正确的18位数字")*/
              $(".div").html("请输入正确的18位数字")
          }else if(num.test(val3)!=true){
            /*  alert("请输入正确的身份证号")*/
               $(".div").html("请输入正确的身份证号")
          }else{
             $(".li2").css({
                "border":"1px solid blue"
             })
             $(".div").html("")
          }
     })  

  $(".input4").blur(function(){

        var phone=/^[1][3578]\d{9}$/;

        val4=$(".input4").val();
        if(val4==""){
            alert("电话号码不能为空")
        }else if(val4.length!=11){
            alert("请输入11位电话号码")
        }else if(phone.test(val4)!=true){
            alert("请输入正确的电话号码")
        }else{
           $(".li4").css({
                "border":"1px solid blue"
             })
           $(this).css(
              "color","#6666"
            )         
        }
   })

        /*var txt1=/^(\d{17}[\d|x])$/,
            txt=/[\u4e00-\u9fa5]/,
            val3=$(".input2").val();
        if(txt1.test(val3)==true){
              alert("输入正确")
        }else if(val3.length!==18){
              alert("请输入的长度")
        }else if(txt.test(val3==true)) {
              alert("不能输入汉字")
        }*/
  

	$('.btn').on("click",function(){
		var 	
	       txt1=$('.input1').val(),
		     txt2=$('.input2').val(),
	       txt3=$('.input3').val(),
	       txt4=$('.input4').val();
		if(txt1.length!=0 && txt2.length!=0 && txt3.length!=0 && txt4.length!=0){
			$('.btn').css({
        "background":"#5E83E1",
        "color":"#fff"
      })

		}else{
			alert('请填写完整！')
		}
	})
	
});