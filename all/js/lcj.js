var lcj_nav=document.getElementById("lcj_nav"),
	nav=lcj_nav.getElementsByTagName("li"),
	lcj=document.querySelectorAll(".lcj"),
	number=document.querySelector(".phonenumber"),
	sub=document.querySelector(".lcj_sub"),
	num=document.querySelectorAll("#lcj_ol li"),
	h3=document.querySelectorAll(".lcj_tc p"),
	ul=document.querySelectorAll(".lcj_mm1");
	console.log(sub)


	console.log(lcj)

	for(var i=0;i<nav.length;i++){
		nav[i].index=i;
		nav[i].addEventListener("click",function(){						
			for(var j=0;j<nav.length;j++){
				nav[j].className="";
				lcj[j].style.display="none";
			}
			this.className="bb";			
			lcj[this.index].style.display="block";
			
		},false)
		
	};

	/*for(var i=0;i<nav.length;i++){
		nav[i].onclick=function(){
			for(var j=0;j<nav.length;j++){
				nav[j].className="";
			}
			this.className="bb"
		}
		
	};*/

	number.onblur=function(){
		var reg=/1[3578]\d{9}/,
			reg1=/(\d{3})(\d{4})(\d{4})/,
			str=number.value;
		
			
		if(reg.test(str)){
			var matches = reg1.exec(str);
			var newNum = matches[1] + ' ' + matches[2] + ' ' + matches[3];
			sub.style.backgroundColor="#5e83e1"
			number.value=newNum
		}else{
			alert("手机号码错误")
		}
	};
	/*number.onfocus=function(){
		var 
			reg1=/(\d{3})(\d{4})(\d{4})/,
			str=number.value;
		var matches = reg.exec(str);
		var newNum = matches[1] + ' ' + matches[2] + ' ' + matches[3];
		number.text(newNum)
	}*/

	for(var i=0;i<num.length;i++){
		num[i].onclick=function(){
			for(var j=0;j<num.length;j++){
				num[j].className=""
			}
			this.className="bor";

		}
	}

	for(var i=0;i<h3.length;i++){
		h3[i].index=i;
		h3[i].onclick=function(){
			for(var j=0;j<ul.length;j++){
				ul[j].style.display="none"
			}
			ul[this.index].style.display="block"
		}
	}
	
 