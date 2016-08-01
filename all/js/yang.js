var showbtn=document.querySelector(".yang_show"),
	number=document.querySelector(".yang_number"),
	watch=document.querySelector(".yang_watch"),
	phonenum=document.querySelector(".yang_number ul"),
	phone=document.querySelector(".yang_phone"),
	yangtab=document.querySelector(".yang_tab"),
	yangPtype=document.querySelectorAll(".yang_Ptype");
	yangbtn=document.querySelector(".yang_btn"),
	yangCbtn=document.querySelectorAll(".yang_Cbtn");
	yangW=document.querySelector(".yang_w");
	yangccid=document.querySelector(".yang_ccid");
	yanginput1=document.querySelector(".yang_input1");
	yanginput2=document.querySelector(".yang_input2");
showbtn.addEventListener("click",function(){
	number.style.transform="translate3d(0,-100%,0)";
},false);

yangW.addEventListener("click",function(){
	yangccid.style.display="block";
	if(yanginput1.value !="" && yanginput2.value != ""){
		watch.value=yanginput1.value
		yangccid.style.display="none";
	}
},false);



phonenum.addEventListener("click",function(e){
	var src= e.target || e.srcElement;
	var text=src.innerText;
	phone.setAttribute("placeholder","已选"+text);
	number.style.transform="translate3d(0,0,0)";
	phone.className="yang_phone yang_bg";
},false);
function addStyle(parent,knowCla,child){
	parent.addEventListener("click",function(e){
		var src= e.target || e.srcElement;
		var srcClass=null;
		if(src.parentNode==parent){
			srcClass=src
		}else{
			srcClass=src.parentNode
		}
		if(srcClass.className==knowCla+" yang_bg"){
			return false;
		}else{
			for(var i=0;i<child.length;i++){
				child[i].className=knowCla;
			}
			srcClass.className=knowCla+" yang_bg";
		}
	},false)
}
addStyle(yangbtn,'yang_Cbtn',yangCbtn);
addStyle(yangtab,'yang_Ptype',yangPtype);