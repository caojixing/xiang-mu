
var submitBtn=document.querySelector("#btn"),
	input1=document.querySelector(".input1"),
	input2=document.querySelector(".input2"),
	input3=document.querySelector(".input3"),
	input4=document.querySelector(".input4");

input1.onblur=function(){
	var reg=/[\u4e00-\u9fa5]/,
		val1=$(".input1").val();	
	if(reg.test(val1) && val1.length>=2){			
			 $(".li").css({"border":"1px solid blue"});	
			return true;
	 		
	}else{
		alert("姓名错误");
		return false;
	}
};

input2.onblur=function(){
	var reg1=/(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
		val2=$(".input2").val();
	if(reg1.test(val2)){
		
		return true;
	}else{
		alert("身份证号输入错误");
		return false;
	}
};

input3.onblur=function(){
	var val3=$(".input3").val();
	if(val3.length!=0){	
		return true;
	}else{
		alert("地址不能为空");
		return false;
	}
};

input4.onblur=function(){
	var reg4=/1[3578]\d{9}/,
		val4=$(".input4").val();
		if(reg4.test(val4)){	
			return true;
		}else{
			alert("手机号码输入错误");
			return false;
		}
}

submitBtn.addEventListener('click',function(){
userresult=input1.onblur()
pwdresult=input2.onblur()
pwd2result=input3.onblur()
num=input4.onblur();



 if(userresult && pwdresult && pwd2result && num){
  //提交表单
    //谁.提交
    //form.submit() 
    alert('正确')
 }  

},false)