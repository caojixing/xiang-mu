define([""],function(){
	var Init=function(){
		this.netNumber=document.querySelector(".net_number");
		this.codeText=document.querySelector(".code_text");
		this.getCode=document.querySelector(".get_code");
		this.loginBtn=document.querySelector(".login_btn");
		this.openCardBtn=document.querySelector(".opencard_btn");
		console.log(this.login)
		this.bindEvent();
	}

	Init.prototype={
		bindEvent:function(){
			var that=this;
			this.netNumber.addEventListener("blur",function(){
				var netNumberVal=that.netNumber.value;
				console.log(netNumberVal)
				isIdCardNo(netNumberVal);
				function isIdCardNo(netNumberVal){
					//if(isNaN(netNumberVal)){alert("输入的不是数字！"); return false;}
					var len=netNumberVal.length,reg;
					if(len==15){
						reg=new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/)
					}else if(len==18){
						reg=new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/)
					}else if(len==0){
						alert("证件号不能为空");
						return false;
					}else{
						alert("输入的证件号位数不对.");
						return false;
					}
					var val=netNumberVal.match(reg);
					if(val!=null){
						if(len==15){
							var D=new Date("19"+val[3]+"/"+val[4]+"/"+val[5]);
							var B=D.getYear()==val[3]&&(D.getMonth()+1)==val[4]&&D.getDate()==val[5];
						}else{
							var D=new Date(val[3]+"/"+val[4]+"/"+val[5]);
							var B=D.getFullYear()==val[3]&&(D.getMonth()+1)==val[4]&&D.getDate()==val[5];
						}
						if(!B){
							alert("输入的身份证号"+val[0]+"里出生日期不对.");
							return false;
						}
					}
					if(!reg.test(netNumberVal)){
						alert("身份证最后一位只能是数字和字母.");
						return false;
					}
					return true;
				}
			},false);

			this.getCode.addEventListener("click",function(){
				var time=60;
				var timer=setInterval(timing,1000);
				var that=this;
				function timing(){
					time--;
					that.disabled=true;
					that.style.borderRadius="5px";
					that.style.background="#EEEEEE";
					that.value=time+"s后重发";
					if(time<0){
						clearInterval(timer);
						that.value="获取验证码";
						that.disabled=false;
					}
				}
			})

			this.codeText.addEventListener("blur",function(){
				var codeTextLen=that.codeText.value.length;
				if(codeTextLen==0){
					document.querySelector(".login_btn").style.background="#ccc";
					document.querySelector(".login_btn").disabled=true;
					alert("验证码不能为空");
				}else{
					document.querySelector(".login_btn").style.background="#5E83E1";
					document.querySelector(".login_btn").disabled=false;
				}
				return true;
			})

			this.loginBtn.addEventListener("click",function(){
				var codeTextLen=that.codeText.value.length,codeTextVal=that.codeText.value,reg;
				console.log(codeTextLen);
				reg=new RegExp(/^[0-9]*$/);
				var val=codeTextVal.match(reg);
				if(codeTextLen!==4){
					alert("验证码错误");
				}else if(!reg.test(val)){
					alert("验证码错误");
					return false;
				}else{
					window.location.href="xie_bind.html";
				}
				return true;
			})

			this.openCardBtn.addEventListener("click",function(){
				
			})
			console.log("bbb")
		}
	}

	var init=new Init();

	return function(){};
})