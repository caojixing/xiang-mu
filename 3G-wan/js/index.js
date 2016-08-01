define(['jquery','js/valid','js/api','js/common','js/dialog'],function($,V,api,common,dialog){
	
	var Id=$('.Id'),
	    Code=$('.Code'),
	    validBtn=$('.code');
	 var Dialog=new dialog();//引用插件
	 var IdVal=$.trim(Id.val());//不让id值里输入空格
	 var CodeVal=$.trim(Code.val());
	 var validCode=null;

	 validBtn.on('click',function(){
	 	if (V.idCard(IdVal)){
	 		common.countDown(validBtn);
	 		api.getAccountInfo({
	 			wechat_id:common.getUrlParams('wechat_id'),
	 			idcard:$.trm(Id.val())
	 		},function(data){
	 			validCode=data.code
	 		});
	 		return;
	 	}
	 	Dialog.alert('请输入正确格式的证件号码',function(){
	 		Id.focus();
	 	});
	 });

	 function check(){
	 	IdVal=$.trim(Id.val());
	 	CodeVal=$.trim(Code.val());
	 	if(IdVal && CodeVal){
	 		if (V.idCard(IdVal) && /\d{6}/.test(CodeVal)){
	 			$('.login-btn').removeClass('btn-dis');
	 		}else{
	 			$('.login-btn').addClass('btn-dis');
	 		}
	 	}
	 }
	 Id.on('input properychange',function(){
	 		check();
	 })
	 Code.on('input properychange',function(){
	 		check();
	 });

	 $('.login-btn').on('click',function(){
	 	if($.trim(Code.val())==validCode){
	 		location.href='';
	 	}else{
	 		alert('验证码有误')
	 	}
	 })
	 $('.card-btn').on('click',function(){
	 	 window.location.href='bangding,html'
	 })

})